class Utilitaire {
    static async normalizeDate(value) {
        if (value instanceof Date) {
            return new Date(value.getFullYear(), value.getMonth(), value.getDate());
        }

        if (typeof value === 'string') {
            const match = value.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
            if (match) {
                const [, year, month, day] = match;
                return new Date(Number(year), Number(month) - 1, Number(day));
            }
        }

        const parsedDate = new Date(value);
        if (Number.isNaN(parsedDate.getTime())) {
            console.error('Date invalide reçue dans normalizeDate:', value);
            throw new Error('Date invalide');
        }

        parsedDate.setHours(0, 0, 0, 0);
        return parsedDate;
    }

    static async validateWeekAndDay(semaine, jour) {
        const numSemaine = Number(semaine);
        const numJour = Number(jour);

        if (!Number.isInteger(numSemaine) || numSemaine < 0) {
            throw new Error('Numero semaine invalide');
        }

        if (!Number.isInteger(numJour) || numJour < 1 || numJour > 7) {
            throw new Error('Numero jour invalide');
        }

        return { numSemaine, numJour };
    };

    static async formatDate(value) {
        const date = await Utilitaire.normalizeDate(value);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    static async formatDateWithTime(value) {
    const date = await Utilitaire.normalizeDate(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


}
module.exports = Utilitaire;
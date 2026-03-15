class AkohoMaty {
    constructor(id, id_lot, nombre, date, cause) {
        this.id = id;
        this.id_lot = id_lot;
        this.nombre = nombre;
        this.date = date;
        this.cause = cause;
    }

    getId() { return this.id; }
    getIdLot() { return this.id_lot; }
    getNombre() { return this.nombre; }
    getDate() { return this.date; }
    getCause() { return this.cause; }

    setId(id) { this.id = id; }
    setIdLot(id) { this.id_lot = id; }
    setNombre(n) { this.nombre = n; }
    setDate(d) { this.date = d; }
    setCause(c) { this.cause = c; }
}

module.exports = AkohoMaty;

class Atody {
    constructor(id, id_lot, nombre, date) {
        this.id = id;
        this.id_lot = id_lot;
        this.nombre = nombre;
        this.date = date;
    }

    getId() { return this.id; }
    getIdLot() { return this.id_lot; }
    getNombre() { return this.nombre; }
    getDate() { return this.date; }

    setId(id) { this.id = id; }
    setIdLot(id) { this.id_lot = id; }
    setNombre(n) { this.nombre = n; }
    setDate(d) { this.date = d; }
}

module.exports = Atody;

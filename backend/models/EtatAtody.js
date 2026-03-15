class EtatAtody {
    constructor(id, id_atody, type, nombre, date) {
        this.id = id;
        this.id_atody = id_atody;
        this.type = type;
        this.nombre = nombre;
        this.date = date;
    }

    getId() { return this.id; }
    getIdAtody() { return this.id_atody; }
    getType() { return this.type; }
    getNombre() { return this.nombre; }
    getDate() { return this.date; }

    setId(id) { this.id = id; }
    setIdAtody(id) { this.id_atody = id; }
    setType(t) { this.type = t; }
    setNombre(n) { this.nombre = n; }
    setDate(d) { this.date = d; }
}

module.exports = EtatAtody;

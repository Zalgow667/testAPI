module.exports = (sequelize, DataTypes) => {
    const Reservations = sequelize.define('Reservations', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        voitureId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dateDebut: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dateFin: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        passagers: {
            type: DataTypes.JSON,
            defaultValue: [],
            allowNull: false
        },
        depart: {
            type: DataTypes.STRING,
            allowNull: false
        },
        arrivee: {
            type: DataTypes.STRING,
            allowNull: false
        },
        adresse: {
            type: DataTypes.STRING,
            allowNull: false
        },
        commentaires: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });

    return Reservations;
}
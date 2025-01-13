module.exports = (sequelize, DataTypes) => {
    const Voitures = sequelize.define('Voitures', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        marque: {
            type: DataTypes.STRING,
            allowNull: false
        },
        modele: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imatriculation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        campus: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Voitures;
};
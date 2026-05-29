const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const User = require("./models/user");

const app = express();

app.use(cors());
app.use(express.json());

/* ───────── CONEXIÓN MONGODB ───────── */

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Mongo conectado"))
.catch(err => console.log(err));

/* ───────── REGISTRO ───────── */
app.post("/register", async (req, res) => {
    const { usuario, password } = req.body;
    const existe = await User.findOne({ usuario });
    if(existe){
        return res.json({ msg: "El usuario ya existe" });
    }
    const hash = await bcrypt.hash(password, 10);
    const nuevoUser = new User({ usuario, password: hash });
    await nuevoUser.save();
    res.json({ msg: "Usuario registrado" });
});

/* ───────── LOGIN ───────── */
app.post("/login", async (req, res) => {
    const { usuario, password } = req.body;
    const user = await User.findOne({ usuario });
    if(!user){
        return res.json({ msg: "Usuario no existe" });
    }
    const valid = await bcrypt.compare(password, user.password);
    if(!valid){
        return res.json({ msg: "Contraseña incorrecta" });
    }
    res.json({ usuario: user.usuario });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor en puerto " + (process.env.PORT || 3000));
});
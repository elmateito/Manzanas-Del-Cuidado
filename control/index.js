const exp = require('express');
const bp = require('body-parser');
<<<<<<< HEAD
/* const mysql = require('mysql'); */
const mysql = require('mysql2/promise')
const { send } = require('express/lib/response');
const res = require('express/lib/response');
const { createConnection } = require('mysql2');
const session = require('express-session');
const path = require('path');
const { ifError } = require('assert');
=======
const mysql = require('mysql2/promise')
const session = require('express-session');
const path = require('path');
>>>>>>> 9a8d32a (Ejecutar con Live Server)
const app = exp();

//set middlewares
app.use(bp.urlencoded({extended:true})); //conexión entre paquetes de mvs y node-modules - activar=true
app.use(bp.json());
app.use(exp.static(__dirname));
app.use(exp.static(path.join(__dirname)));
app.use(session({
    secret:'osgualdo',
    resave: false,
    saveUninitialized: false
}))

/* 
archivos del sitio web que guardan pequeñas cantidades de info en el navegador
como nuestro user y contraseña

archivos unicos para cada sitio web(a excepcion de las third-party cookies(ad-sense))

preferencias-habitos de navegación-historial busquedas-hora de ingreso-historial de clicks

cookies de autenticacion de usuario: recuerdan temporalmente el log del user, 
y se borra al cerrar sesión o cerrar el navegador
*/

const db = {
    host:'localhost',
    user:'root',
    password: '',
    database: 'manzanas'
}

<<<<<<< HEAD
/* --- CREDENCIALES --- */
=======
/* ----- CREDENCIALES ----- */
>>>>>>> 9a8d32a (Ejecutar con Live Server)

/* CREAR USUARIO */

app.post('/create', async(req, res)=>{
    const{docnum, doctype, username, manzanaid} = req.body;
    try{
        //existing user
        const conn = await mysql.createConnection(db)
        const [check] = await conn.execute(`SELECT * FROM usuarios WHERE doc = ? AND tipoDoc = ?`,
        [docnum, doctype])
        if(check.length>0){
            res.status(401).send(`
            <script>
                window.onload = function(){
                    alert('usuario existente')
                    window.location.assign('http://127.0.0.1:5500/vista/html/index.html')
                }
            </script>
            `)
        }else{
        await conn.execute(`INSERT INTO usuarios (doc, tipoDoc, nombre, idManzanaFK) VALUES (?, ?, ?, ?)`, [docnum, doctype, username, manzanaid]) 
            res.status(201).send(`
            <script>
                window.onload = function(){
                    //alert('user registered')
                    window.location.href = 'http://127.0.0.1:5500/vista/html/logged.html'
                }
            </script>
            `)
        } 
    await conn.end()
    }
    catch(err){
        console.log('Reg error')
        res.status(500).send('Err'+err.stack)
    }
})

/* VERIFICAR ROL */

app.post('/read', async(req, res)=>{
    const {doctype, docnum} = req.body
    try {
        const conn = await mysql.createConnection(db)
        const [check] = await conn.execute('SELECT rol, nombre FROM usuarios WHERE doc = ? AND tipoDoc = ?', [docnum, doctype])
        //const logrol = check[0].rol
        //console.log(logrol)
        console.log(check)
        if (check.length==1){
            req.session.usuario = check[0].nombre
            req.session.rol = check[0].rol
            req.session.tipo = doctype
            req.session.docnum = docnum
            if(check[0].rol === 'Administrador'){
                res.sendFile(path.join(__dirname,'../vista/html/admin/admin.html'))
            }else{
                const username = {nombre: check[0].nombre}
                //console.log(username)
                res.locals.username = username
                res.locals.doctype = doctype
                res.locals.docnum = docnum
                res.sendFile(path.join(__dirname,'../vista/html/user/home.html'))
            }
        }else{
<<<<<<< HEAD
=======
            console.log('Error al Iniciar Sesión', err)
>>>>>>> 9a8d32a (Ejecutar con Live Server)
            res.status(401).send(`
            <script>
                window.onload = function(){
                    alert('usuario no encontrado')
                    window.location.href = 'http://127.0.0.1:5500/vista/html/log.html'
                }
            </script>
            `)
        }
        await conn.end()
    }catch (err) {
<<<<<<< HEAD
        console.log('Reg error', err)
=======
        console.log('Error al registrar', err)
>>>>>>> 9a8d32a (Ejecutar con Live Server)
        res.status(500).send(`
        <script>
            window.onload = function(){
                alert('server error')
                window.location.href = 'http://127.0.0.1:5500/vista/html/log.html'
            }
        </script>
        `)
    }
})

/* MOSTRAR USUARIO */

app.post('/read-user', (req, res)=>{
    const username = req.session.usuario
    const rol = req.session.rol
    const doctype = req.session.tipo
    const docnum = req.session.docnum
    console.log({username, doctype, docnum})
    if(username){
        res.json({nombre: username,
                rol: rol,
                tipo: doctype,
                docnum: docnum})
    }
})

<<<<<<< HEAD
app.post('/get-iamge', (req,res)=>{
    res.sendFile(path.join(__dirname,'../vista/media/logo-simbolo-mc_.png'))
})

/* --- USUARIO --- */
=======
app.post('/get-image', (req,res)=>{
    res.sendFile(path.join(__dirname,'../vista/media/logo-simbolo-mc_.png'))
})

/* ----- USUARIO ----- */
>>>>>>> 9a8d32a (Ejecutar con Live Server)

/* MOSTRAR SERVICIOS */

app.post('/get-user-service', async(req,res)=>{
    const username = req.session.usuario
    const doctype = req.session.tipo
    const docnum = req.session.docnum
    console.log({username, doctype, docnum})
    try {
        const conn = await mysql.createConnection(db)     
        const [serviceData] = await conn.execute('SELECT servicios.nombreServicio FROM usuarios INNER JOIN manzanas ON manzanas.idManzana = usuarios.idManzanaFK INNER JOIN manzanas_servicios ON manzanas_servicios.idManzanaFK = manzanas.idManzana INNER JOIN servicios ON servicios.idServicio = manzanas_servicios.idServicioFK WHERE usuarios.tipoDoc = ? AND usuarios.doc = ?', [doctype, docnum])
        console.log(serviceData)
        res.json({servicios: serviceData.map(row=>row.nombreServicio)})
    await conn.end()
    } catch (error) {
<<<<<<< HEAD
        console.error('Server err', error)
=======
        console.error('Error al mostrar Servicios', error)
>>>>>>> 9a8d32a (Ejecutar con Live Server)
        res.status(500).send('ay q mondaquera')
    }
})

/* MOSTRAR SOLICITUDES */

app.post('/solicitudes', async(req,res)=>{
    const username = req.session.usuario
    const doctype = req.session.tipo
    const docnum = req.session.docnum
    console.log({username, doctype, docnum})
    try {
        const conn = await mysql.createConnection(db)
        const[solicitudData] = await conn.execute('SELECT solicitudes.idSolicitud, servicios.nombreServicio, servicios.tipoServicio, solicitudes.fecha FROM solicitudes INNER JOIN usuarios ON usuarios.idUsuario = solicitudes.idUsuarioFK INNER JOIN manzanas ON manzanas.idManzana = usuarios.idManzanaFK INNER JOIN manzanas_servicios ON manzanas_servicios.idManzanaFK = manzanas.idManzana INNER JOIN servicios ON servicios.idServicio = manzanas_servicios.idServicioFK WHERE usuarios.tipoDoc = ? AND usuarios.doc = ? AND solicitudes.codigoServicio = servicios.idServicio', [doctype, docnum])
        console.log(solicitudData)
        res.json({solicitudes: solicitudData.map(row=>([
                row.idSolicitud,
                row.nombreServicio,
                row.tipoServicio,
                row.fecha.toLocaleString()
            ]))
        })
    await conn.end()
    } catch (error) {
<<<<<<< HEAD
        console.error('Save err', error)
=======
        console.error('Error al mostrar Solicitudes', error)
>>>>>>> 9a8d32a (Ejecutar con Live Server)
        res.status(500).send('ay q mondaquera')
    }
})

/* GUARDAR SOLICITUDES */

app.post('/save-user-service', async(req, res)=>{
    const username = req.session.usuario
    const doctype = req.session.tipo
    const docnum = req.session.docnum
    const {servicios, fechaHora} = req.body
    console.log({username, doctype, docnum})
    try {
        const conn = await mysql.createConnection(db)

        const [idQuery] = await conn.execute(`SELECT idUsuario FROM usuarios WHERE tipoDoc = ? AND doc = ?`, [doctype, docnum]);
        console.log(idQuery[0].idUsuario, doctype, docnum, servicios)

        const [serviceData] = await conn.execute('SELECT idServicio FROM servicios WHERE nombreServicio = ?', [servicios[0]]);
        console.log(serviceData, servicios[0])

        await conn.execute('INSERT INTO solicitudes (idUsuarioFK, fecha, codigoServicio) VALUES (?, ?, ?)', [idQuery[0].idUsuario, fechaHora, serviceData[0].idServicio])

        res.status(200).send(`
            <script>
                window.onload = function(){
                    alert('Servicio Guardado')
                }
            </script>
        `)
    await conn.end()
    }catch (error) {
<<<<<<< HEAD
        console.error('Save err', error)
=======
        console.error('Error al guardar Solicitud', error)
>>>>>>> 9a8d32a (Ejecutar con Live Server)
        res.status(500).send('ay q mondaquera')
    }
})

/* BORRAR SOLICITUDES */

app.delete('/delete-solicitudes', async(req, res)=>{
    const {idSol} = req.body
    console.log(idSol)
    try {
        const conn = await mysql.createConnection(db)
        await conn.execute('DELETE FROM solicitudes WHERE idSolicitud = ?', [idSol])
        res.status(200).send(`
        <script>
            window.onload = function(){
                alert('Solicitud Borrada')
                window.location.reload()
                history.back()
            }
        </script>
    `)
        console.log('Solicitud Borrada')
        await conn.end()
    } catch (error) {
<<<<<<< HEAD
        console.error('Delete err', error)
=======
        console.error('Error al borrar Solicitud', error)
>>>>>>> 9a8d32a (Ejecutar con Live Server)
        res.status(500).send('ay q mondaquera')
    }
})


<<<<<<< HEAD
/* --- ADMINISTRADOR --- */
=======
/* ----- ADMINISTRADOR ----- */
>>>>>>> 9a8d32a (Ejecutar con Live Server)


/* FUNCIONES SERVICIOS */

<<<<<<< HEAD


=======
>>>>>>> 9a8d32a (Ejecutar con Live Server)
app.get('/get-admin', async(req,res)=>{
    res.sendFile(path.join(__dirname,'../vista/html/admin/admin.html'))
})

app.get('/create-service-page', async(req,res)=>{
    res.sendFile(path.join(__dirname,'../vista/html/admin/service.html'))
})

/* CREAR SERVICIO */

app.post('/create-service', async(req, res)=>{
    const {nomServicio, tipoServicio} = req.body
    console.log(nomServicio, tipoServicio)
    try {
        const conn = await mysql.createConnection(db)
        await conn.execute('INSERT INTO servicios (nombreServicio, tipoServicio) VALUES (?, ?)', [nomServicio, tipoServicio])
        res.status(200).send(`
        <script>
            window.onload = function(){
                alert('Servicio Creado')
                window.location.reload()
                history.back()
            }
        </script>
        `)
        console.log('Servicio Creado')
        await conn.end()
    } catch (error) {
<<<<<<< HEAD
        console.error('Save err', error)
=======
        console.error('Error al crear Servicio', error)
>>>>>>> 9a8d32a (Ejecutar con Live Server)
        res.status(500).send('ay q mondaquera')
    }
})

/* ACTUALIZAR SERVICIO */

app.post('/update-service', async (req, res)=>{
    const {idServ, namServ, tipoServ} = req.body;
    console.log(idServ, namServ, tipoServ)
    try{
        const conn = await mysql.createConnection(db)
        await conn.execute('UPDATE servicios SET nombreServicio = ?, tipoServicio = ? WHERE idServicio = ?', [namServ, tipoServ, idServ])
        res.status(200).send(`
        <script> 
            alert('Servicio Actualizado')
            window.location.reload()
            history.back()
        </script>`)
        await conn.end()
    }catch (error) { 
<<<<<<< HEAD
        console.error('Server err', error)
=======
        console.error('Error al actualizar Servicio', error)
>>>>>>> 9a8d32a (Ejecutar con Live Server)
        res.status(500).send('ay q mondaquera')
    }
}) 

/* MOSTRAR SERVICIOS */

app.post('/get-services', async(req,res)=>{
    const username = req.session.usuario
    const doctype = req.session.tipo
    const docnum = req.session.docnum
    console.log({username, doctype, docnum})
    try {
        const conn = await mysql.createConnection(db)     
        const [serviceData] = await conn.execute('SELECT * FROM servicios')
        console.log(serviceData)
        res.json({services: serviceData.map(row=>([
            row.idServicio,
            row.nombreServicio,
            row.tipoServicio
        ]))
    })
    await conn.end()
    } catch (error) {
<<<<<<< HEAD
        console.error('Server err', error)
=======
        console.error('Error al mostrar Servicio', error)
>>>>>>> 9a8d32a (Ejecutar con Live Server)
        res.status(500).send('ay q mondaquera')
    }
})

/* ELIMINAR SERVICIOS */

app.delete('/delete-service', async(req, res)=>{
    const {idSer} = req.body
    console.log(idSer)
    try{
        const conn = await mysql.createConnection(db);
        await conn.execute('DELETE FROM servicios WHERE idServicio = ?',[idSer]);
        res.status(200).send(`
        <script>
            window.onload = function(){
                alert('Servicio Borrado')
                window.location.reload()
                history.back()
            }
        </script>
        `)
        console.log('Servicio Borrado')
        await conn.end()
    }catch(error){
<<<<<<< HEAD
        console.error('Server err', error)
=======
        console.error('Error al borrar Servicio', error)
>>>>>>> 9a8d32a (Ejecutar con Live Server)
        res.status(500).send('ay q mondaquera')
    }
})

/* FUNCIONES MANZANAS */

<<<<<<< HEAD
/* CREAR MANZANA */

=======
>>>>>>> 9a8d32a (Ejecutar con Live Server)
app.get('/create-manzana-page', async(req,res)=>{
    res.sendFile(path.join(__dirname,'../vista/html/admin/manzana.html'))
})

<<<<<<< HEAD
=======
/* CREAR MANZANA */

>>>>>>> 9a8d32a (Ejecutar con Live Server)
app.post('/create-manzana', async(req, res)=>{
    const {nomManzana, dirManzana} = req.body
    console.log(nomManzana, dirManzana)
    try {
        const conn = await mysql.createConnection(db)
        await conn.execute('INSERT INTO manzanas (nombreManzana, direccionManzana) VALUES (?, ?)', [nomManzana, dirManzana])
        res.status(200).send(`
        <script>
            window.onload = function(){
                alert('Manzana Creada')
                window.location.reload()
                history.back()
            }
        </script>
        `)
        console.log('Manzana Creada')
        await conn.end()
    } catch (error) {
<<<<<<< HEAD
        console.error('Save err', error)
=======
        console.error('Error al crear Manzana', error)
>>>>>>> 9a8d32a (Ejecutar con Live Server)
        res.status(500).send('ay q mondaquera')
    }
})

<<<<<<< HEAD
=======
/* ACTUALIZAR MANZANA */

app.post('/update-manzana', async (req, res)=>{
    const {idMan, namMan, dirMan} = req.body;
    console.log(idMan, namMan, dirMan)
    try{
        const conn = await mysql.createConnection(db)
        await conn.execute('UPDATE manzanas SET nombreManzana = ?, direccionManzana = ? WHERE idManzana = ?', [namMan, dirMan, idMan])
        res.status(200).send(`
        <script> 
            alert('Manzana Actualizada')
            window.location.reload()
            history.back()
        </script>`)
        await conn.end()
    }catch (error) { 
        console.error('Error al actualizar Manzana', error)
        res.status(500).send('ay q mondaquera')
    }
}) 

>>>>>>> 9a8d32a (Ejecutar con Live Server)
/*  ELIMINAR MANZANA */

app.delete('/delete-manzana', async(req, res)=>{
    const {idMan} = req.body
    console.log(idMan)
    try{
        const conn = await mysql.createConnection(db);
        await conn.execute('DELETE FROM manzanas WHERE idManzana = ?', [idMan]);
        res.status(200).send(`
        <script>
            window.onload = function(){
                alert('Manzana Borrada')
                window.location.reload()
                history.back()
            }
        </script>
        `)
        console.log('Manzana Borrada')
        await conn.end()
    }catch(error){
<<<<<<< HEAD
        console.error('Server err', error)
=======
        console.error('Error al borrar Manzana', error)
>>>>>>> 9a8d32a (Ejecutar con Live Server)
        res.status(500).send('ay q mondaquera')
    }
})


/* MOSTRAR MANZANA */

app.post('/get-manzanas', async(req,res)=>{
    const username = req.session.usuario
    const doctype = req.session.tipo
    const docnum = req.session.docnum
    console.log({username, doctype, docnum})
    try {
        const conn = await mysql.createConnection(db)     
        const [serviceData] = await conn.execute('SELECT * FROM manzanas')
        console.log(serviceData)
        res.json({manzanas: serviceData.map(row=>([
            row.idManzana,
            row.nombreManzana,
            row.direccionManzana
            ]))
        })
    await conn.end()
    } catch (error) {
<<<<<<< HEAD
        console.error('Server err', error)
=======
        console.error('Error al mostrar Manzanas', error)
        res.status(500).send('ay q mondaquera')
    }
})

/* FUNCIONES USUARIOS */

app.get('/update-user-page', async(req,res)=>{
    res.sendFile(path.join(__dirname,'../vista/html/admin/usuarios.html'))
})

/* MOSTRAR USUARIOS */

app.post('/get-users', async(req,res)=>{
    const username = req.session.usuario
    const doctype = req.session.tipo
    const docnum = req.session.docnum
    console.log({username, doctype, docnum})
    try {
        const conn = await mysql.createConnection(db)     
        const [userData] = await conn.execute(`SELECT * FROM usuarios WHERE rol = 'Usuario'`)
        console.log(userData)
        res.json({usuarios: userData.map(row=>([
            row.idUsuario,
            row.nombre,
            row.tipoDoc,
            row.doc
        ]))
    })
    await conn.end()
    } catch (error) {
        console.error('Error al mostrar Usuarios', error)
        res.status(500).send('ay q mondaquera')
    }
})

/* ACTUALIZAR USUARIOS */

app.post('/update-user', async (req, res)=>{
    const {idUser, namUser, tipoDoc} = req.body;
    console.log(idUser, namUser, tipoDoc)
    try{
        const conn = await mysql.createConnection(db)
        await conn.execute('UPDATE usuarios SET nombre = ?, tipoDoc = ? WHERE idUsuario = ?', [namUser, tipoDoc, idUser])
        res.status(200).send(`
        <script> 
            alert('Usuario Editado')
            window.location.reload()
            history.back()
        </script>`)
        await conn.end()
    }catch (error) { 
        console.error('Error al editar Usuario', error)
        res.status(500).send('ay q mondaquera')
    }
})

/* ELIMINAR USUARIOS */ 

app.delete('/delete-user', async(req, res)=>{
    const {idUser} = req.body
    console.log(idUser)
    try{
        const conn = await mysql.createConnection(db);
        await conn.execute('DELETE FROM usuarios WHERE idUsuario = ?', [idUser]);
        res.status(200).send(`
        <script>
            window.onload = function(){
                alert('Usuario Borrado')
                window.location.reload()
                history.back()
            }
        </script>
        `)
        console.log('Usuario Borradoa')
        await conn.end()
    }catch(error){
        console.error('Error al borrar Usuario', error)
>>>>>>> 9a8d32a (Ejecutar con Live Server)
        res.status(500).send('ay q mondaquera')
    }
})

/* CERRAR SESIÓN */

app.post('/close-session', async(req, res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.error('Error al cerrar sesión', err)
            res.status(500).send('Error al cerrar sesión')
        }else{
            console.error('Sesión Cerrada')
            res.status(200).send('Sesión Cerrada')
        }
    })
})

<<<<<<< HEAD
/* --- PUERTO EN ESCUCHA --- */ 
=======
/* ----- PUERTO EN ESCUCHA ----- */ 
>>>>>>> 9a8d32a (Ejecutar con Live Server)

app.listen(3000, ()=>{
    console.log('Server listening');
})


const path = require('path'); 
const config = (app,middleware)=>{ 
    app.use(middleware.static(path.join(path.resolve(),'/public')));
    app.use(middleware.json())
    app.use(middleware.urlencoded({extended:true}))
}
module.exports = config
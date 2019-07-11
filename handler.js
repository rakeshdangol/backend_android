const config = require("./knexfile");
const multer = require("multer");
const path = require("path");
const knex = require("knex");
const dbClient = knex(config);


const register = (req, res) => {
    const Name = req.body.Name;
    const Phone = req.body.Phone;
    const Address = req.body.Address;
    const Email = req.body.Email;
    const Password = req.body.Password;
  

    dbClient("Users")
      .insert({ Name, Phone, Address, Email,Password })
      .then(() =>
        res.json({ status: true, message: "User created successfully." })
      )
      .catch(err => res.json({ status: false, message: err.message }));
  };
  const login =(req,res)=>
{
  const Email = req.body.Email;
  const password = req.body.Password;

  dbClient("Users")
  .select()
  .where({Email:Email,Password:password})
  .then(function(data) {
      if(data.length == 0)
      {
        res.json({success:false})
      }
      else
      {
        res.json({success:true})
      }
  })
  .catch(err => res.json({success:false,message: err.message}));
  
};

    async function getUserByEmail(request, response){
        const email = request.params.email;
        const data = await dbClient("Users").select().where({email});
        response.json(data[0]);
}
async function petAdd(req, res) {
    try {
        const title = req.body.title;
        const price = req.body.price;
        const image = req.body.image;
        const Description = req.body.Description;
  
        const data = await dbClient.table("petadd").insert({ title, price, image, Description})
        res.json({
            status: true,
            success: true,
            message: "pet Added"
        })
    } catch (error) {
        res.json({
            status: false,
            success: false,
            message: error.message
        });
    }
  };
  const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    }
  });
  
  const upload = multer({ storage }).single("image");
  
  const uploadImage = (req, res) => {
    upload(req, res, err => {
      if (err) {
        res.json({ status: false, message: err.message });
      } else {
        res.json({ status: true, message: req.file.filename });
      }
    });
  };
  const getAllpet = (req, res) => {
    dbClient("petadd")
      .select()
      .then(data => res.json( data ))
      .catch(err => res.json({ status: false, message: err.message }));
  };
  async function updateUser(req, res) {
    try {
      const Name = req.body.Name;
      const Phone = req.body.Phone;
      const Address = req.body.Address;
      const Password = req.body.Password;
  
        const data = await dbClient.table('Users').where({ email: req.params.email }).update({ Name, Phone, Address, Password });
  
        res.json({
            status: 'success',
            success: true,
            message: 'update success'
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            status: 'fail',
            message: 'failed to update'
        })
    }
  }
  async function deleteUser(req,res){
    try{
      const data = await dbClient.table('Users').where({email: req.params.email}).delete();
   
    res.json({
      status: 'success',
      success: true,
      message: 'Delete success'
  })
  } catch (error) {
  console.log(error)
  res.json({
      success: false,
      status: 'fail',
      message: 'failed to Delete'
  })
  }
  }
  
  
  
  


module.exports ={
    register,login,getUserByEmail,petAdd,uploadImage,getAllpet,updateUser,deleteUser
}

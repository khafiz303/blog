const User = require('./User');
const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
    if (
        req.body.email.length <= 0 &&
        req.body.full_name.length <= 0 &&
        req.body.password.length <= 0 &&
        req.body.re_password.length <= 0
    ) {
        res.redirect('/sign?error=1');
        return
    } else if (req.body.password != req.body.re_password) {
        res.redirect('/sign?error=2');
        return
    }

    const findUser = await User.findOne({ email: req.body.email }).countDocuments();

    if (findUser) {
        res.redirect('/sign?error=3');
    }else{
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                new User({
                    email: req.body.email,
                    full_name: req.body.full_name,
                    password: hash,
                }).save()
                res.redirect('/login');
            });
        });
    }

   
};


const login = async(req , res) =>{
    if(req.user._id){
        res.redirect(`/profile/${req.user._id}`)
    }
}


const signOut = async(req , res) =>{
    req.logout(function(err){
        if(err){
            console.log(err);
        }
    })
    res.redirect('/')

}
const githubLogin = (req , res) =>{
    res.redirect('/profile/'+ req.user._id)
}



module.exports = { signUp , login, signOut, githubLogin };

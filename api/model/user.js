const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String,  },
    email: { type: String,  },
    password: { type: String, },
    employeeID: { type: String,  },
    phoneNumber: { type: String,  },
    token: { type: String }
});
module.exports = mongoose.model('User', userSchema);
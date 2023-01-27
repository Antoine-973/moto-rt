const bcryptjs = require("bcryptjs");

exports.comparePassword = (password, hash) => {
    bcryptjs.compare(password, hash).then((res) => {
        console.log(res);
        return res;
    }
    ).catch((err) => {
        console.log(err);
    }
    );
}
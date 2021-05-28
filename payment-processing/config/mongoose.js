const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://recruitBaeBoo:devionJave2020@recruitapp-mongotest-hayqv.mongodb.net/a&D_Mart', {useUnifiedTopology:true, useNewUrlParser:true}, () => {
    if (mongoose.connection.readyState !== 3) {
        console.log(`MongoDB Connection Established: ${mongoose.connection.readyState}`);
    } else {
        console.log(`MongoDB Connection Error: ${mongoose.connection.readyState}`);
        return;
    }
});

module.exports = {mongoose};
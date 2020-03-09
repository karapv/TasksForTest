const Backbone = require('backbone');
const User =  Backbone.Model.extend({
    defaults: {
        ids: 0,
        name: '',
        tel: ''
    }
});
export default User;



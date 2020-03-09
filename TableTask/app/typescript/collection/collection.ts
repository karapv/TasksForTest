const Backbone = require('backbone');
import User from "../model/model";
const UsersCollection = Backbone.Collection.extend({
    model: User
});
export default UsersCollection;
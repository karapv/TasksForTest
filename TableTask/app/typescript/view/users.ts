const Backbone = require('backbone');
const _  = require('underscore');
import UserView from "./user";
const UsersView = Backbone.View.extend({
    tagName: 'tbody',
    initialize: function() {
        this.collection.on('add', this.addOne, this );
    },
    render: function() {
        this.collection.each(function(user){
            let userView = new UserView({model: user});
            this.el.append(userView.render().el);
        }, this);
        return this;
    },
    addOne: function (user) {
        let taskView = new UserView({ model: user });
        this.el.append(taskView.render().el);
    }
});
export default UsersView;
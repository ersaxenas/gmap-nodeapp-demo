/**
 * Created by saurabh on 11/30/14.
 */
$(document).ready(function () {

});

app.StateView = Backbone.View.extend({
    template: _.template($('#option-template').html()),
    render: function () {
        var html = this.template(this.model.toJSON());
        this.setElement(html);
        return this;
    },
    events: {}
});

app.ZipCodeView = Backbone.View.extend({
    template: _.template($('#zipcodes-template').html()),
    render: function () {
        var html = this.template(this.model.toJSON());
        this.setElement(html);
        return this;
    },
    events: {}
});

app.GmapView = Backbone.View.extend({
    el: '#bcontent',
    template: _.template($('#gmap-template').html()),
    initialize: function () {
        app.stateList.fetch();
        this.$el.html(this.template());
        app.initGmapApp();
        app.stateList.on('reset', this.renderStates, this);
        app.cityList.on('reset', this.renderCities, this);
        app.zipList.on('reset', this.renderZips, this);
    },
    events: {},
    renderStates: function () {
        app.stateList.forEach(function (lstate) {
            var view = new app.StateView({model: lstate});
            $('#cstates').append(view.render().el);
        });
    },
    renderCities: function () {
        $('#ccity').html('');
        $('#ccity').append('<option value="Select City">Select City</option>');
        app.cityList.forEach(function (lcity) {
            var view = new app.StateView({model: lcity});
            $('#ccity').append(view.render().el);
        });
        $('#ccity').val($('#ccity option')[0].value);
        $('#ccity').selectmenu('refresh', true);
    },
    renderZips: function () {
        $('#czip').html('');
        $('#czip').append('<option value="Select ZipCode">Select ZipCode</option>');
        app.zipList.forEach(function (zip) {
            var view = new app.ZipCodeView({model: zip});
            $('#czip').append(view.render().el);
        });
        $('#czip').val($('#czip option')[0].value);
        $('#czip').selectmenu('refresh', true);
    },
    remove: function() {
        this.undelegateEvents();
        this.$el.empty();
        return this;
    }
});


app.bonsaiView = Backbone.View.extend({
    el: '#bcontent',
    template: _.template($('#bonsai-template').html()),
    initialize: function () {
        this.$el.html(this.template());
        app.initBonsaiApp();
    },
    render: function() {
        this.$el.html(this.template());
        app.initBonsaiApp();
    },
    events: {},
    remove: function() {
        this.undelegateEvents();
        this.$el.empty();

        return this;
    }
});

app.activateView = function(action) {
   if(action == 'GMap') {
       app.mainView.unbind();
       app.mainView.remove();
       app.mainView = new app.GmapView();

   }
    else if(action == 'Bonsai') {
       app.mainView.unbind();
       app.mainView.remove();
       app.mainView = new app.bonsaiView();

   }
}

app.mainView = new app.GmapView();
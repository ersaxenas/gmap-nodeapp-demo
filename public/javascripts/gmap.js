/*Models*/
app.StateModel = Backbone.Model.extend({
      defaults: {
        name: ''
      }
    });

app.CityModel = Backbone.Model.extend({
      defaults: {
        name: ''
      }
    });

app.ZipModel = Backbone.Model.extend({
      defaults: {
        zipcode: ''
      }
    });

app.StateList = Backbone.Collection.extend({
      model: app.StateModel,
      url: '/states'
    });

app.CityList = Backbone.Collection.extend({
      model: app.CityModel,
      url: '/city'
    });

app.ZipList = Backbone.Collection.extend({
      model: app.ZipModel,
      url: '/zipcode'
    });
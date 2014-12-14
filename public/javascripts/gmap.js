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
        zip: '',
        latitude: 0,
        longitude: 0
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

app.stateList = new app.StateList();
app.cityList = new app.CityList();
app.zipList = new app.ZipList();

app.onStateSelect = function (state) {
    $.getJSON('/getcoordinates', {state: state}, function (data) {
        if (data.length <= 0) {
            console.log('Coordinates not found in the database.');
            return;
        }
        app.updateMapLatLong(data[0].latitude, data[0].longitude);
    });
    app.cityList.fetch({data: {state: state}});
}

app.onCitySelect = function (city, state) {
    if (city) {
        $.getJSON('/getcoordinates', {state: state, city: city}, function (data) {
            if (data.length <= 0) {
                console.log('Coordinates not found in the database.');
                return;
            }
            app.updateMapLatLong(data[0].latitude, data[0].longitude);
        });
        app.zipList.fetch({data: {city: city, state: state}});
    }

}
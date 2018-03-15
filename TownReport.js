{
    const Park = function (name, age, treeCount, are) {
        this.name = name;
        this.age = parseFloat(age);
        this.treeCount = parseInt(treeCount);
        this.are = parseFloat(are); //area
    }
    Park.prototype.treeDensity = function () {
        return (this.treeCount / this.are).toFixed(2);
    }

    const Street = function (size='normal', ...args) {
        this.name = args[0];
        this.length = parseFloat(args[1]);
        this.year = parseInt(args[2]);
        this.size = size;
    }

    var Town = (function () {
        this.parks = [];
        this.streets = [];
    });

    Town.prototype.addPark = function (name, age, treeCount, are) {
        const newPark = new Park(name, age, treeCount, are);
        this.parks.push(newPark);
    }

    Town.prototype.addStreet = function (name, length, year, size){
        const newStreet = new Street(size , name, length, year);
        this.streets.push(newStreet);
    }
}

(function (Town) {
    Town.prototype.getParkAgeAverage = function () {
        let total = 0;

        for(const num of this.parks.map(e => {return e.age}))
            total += num;

        return (total/this.parks.length).toFixed(2);
    }

    Town.prototype.findParkWithTC = function (count) {
        return this.parks.find(e => e.treeCount >= count);
    }

    Town.prototype.parksReport = function (treeLimit=1000) {
        console.log("              -----PARKS REPORT-----");
        console.log(`Our ${this.parks.length} parks have an average age of ${this.getParkAgeAverage()} years.`);
        for (const e of this.parks) {
            console.log(`${e.name} has a tree density of ${e.treeDensity()} trees per square km`);
        }
        const {name} = this.findParkWithTC(treeLimit);
        console.log(`${name} has more than ${treeLimit} trees.`);
    }

    Town.prototype.getStreetTotalAverage = function () {
        let totals = [0,0];
        for(const {length} of this.streets) {
            totals[0] += length;
        }
        totals[1] = (totals[0] / this.streets.length).toFixed(2);
        
        return totals;
    }

    Town.prototype.streetReport = function () {
        console.log("            -----STREET REPORT-----");
        const [len,avg] = this.getStreetTotalAverage();
        console.log(`Our ${this.streets.length} street${(this.streets.length > 1)? "s" : ""} have a total length of ${len} km, with an average of ${avg} km.`);
        for(const {name, year, size} of this.streets){
            console.log(`${name}, built in ${year}, is a ${size} street.`);
        }
    }

    Town.prototype.EOYReport = function () {
        this.parksReport();
        this.streetReport();
    }
})(Town);


report = (function () {
    var myTown = new Town();

    myTown.addPark("Green Park", 75, 500, 5);
    myTown.addPark("National Park", 90.5, 1200, 6);
    myTown.addPark("Oak Park", 20, 135, 1);

    myTown.addStreet("Ocean Avenue",11.35, 2010,"big");
    myTown.addStreet("Evergreen Street", 8.3, 1999);
    myTown.addStreet("4th Street",5.25, 1920,"small");
    myTown.addStreet("Sunset Boulevard",14.5, 2018, "huge");

    myTown.EOYReport();
});


var axios = require('axios')

function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

module.exports = function(app){

    app.get('/nearbycities/:lat/:lng',(req,res)=>{
        let cities = []
        let result = []
        console.log(req.params.lat,req.params.lng)
        const lat = req.params.lat
        const lng = req.params.lng
        axios.get(`https://gist.githubusercontent.com/dastagirkhan/00a6f6e32425e0944241/raw/33ca4e2b19695b2b93f490848314268ed5519894/gistfile1.json`)
        .then(response=>{
            cities = response.data
            
            for(let i=0;i<cities.length;i++)
            {
                const city = {
                    name: cities[i].name,
                    distance : distance(lat,lng,cities[i].lat,cities[i].lng)
                }
                result = [...result,city.name]
            }
            result.sort((a,b)=>{
                if(a.distance < b.distance)
                return -1
                
                if(a.distance > b.distance)
                return 1
                
                return 0
            })
            res.send(result.slice(0,10))
        })
        .catch(err=>{
            res.send(err)
        })
    })

}
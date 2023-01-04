AFRAME.registerCompnent("markerHandler",{
    init: async function () {

        var toys = await this.getToys();

        this.el.addEventListener("markerFound",()=>{
            var markerId = this.el.id;   
            this.handleMarkerFound(toys,markerId)
        })

        this.el.addEventListener("markerLost",()=>{
            this.handleMarkerLost()
        })
        
    },

    handleMarkerFound: function (toys, markerId) {        

        var buttonDiv = document.getElementById("button-div")
        buttonDiv.style.display = "flex"

        var ratingButton = document.getElementById("rating-button")
        ratingButton.addEventListener("click",()=>{
            swal({
                icon:"warning",
                title:"Rate Toy",
                text:"Work in progress"
            })
        })
        var orderButton = document.getElementById("order-button")
        orderButton.addEventListener("click",()=>{
            swal({
                icon:"https://i.imgur.com/4NZ6uLY.jpg",
                title:"Thanks for Order",
                text:"Your order will be arrived soon!"
            })
        })

        var orderSummaryButton = document.getElementById("order-summary-button")
        orderSummaryButton.addEventListener("click",()=>{
            swal({
                icon:"warning",
                title:"Order Summary",
                text:"Work in progress"
            })
        })

        var toy = toys.filter(toy => toy.id === markerId)[0];
  
        var model = document.querySelector(`#model-${toy.id}`);
        model.setAttribute("position", toy.model_geometry.position);
        model.setAttribute("rotation", toy.model_geometry.rotation);
        model.setAttribute("scale", toy.model_geometry.scale);

    },

    handleMarkerLost:()=>{
        var buttonDiv = document.getElementById("button-div")
        buttonDiv.style.display = "none"
    },

    getToys: async function () {
        return await firebase
          .firestore()
          .collection("toys")
          .get()
          .then(snap => {
            return snap.docs.map(doc => doc.data());
          });
      }
})

  
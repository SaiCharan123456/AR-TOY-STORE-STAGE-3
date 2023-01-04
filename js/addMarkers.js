AFRAME.registerComponent("create-markers", {
  init:async()=>{
    var mainScene = document.querySelector("#main-scene");
    var toys  = await this.getoys();

    toys.map(toy=>{
      var marker = document.createElement("a-marker")
      marker.setAttribute("id",toy.id)
      marker.setAttribute("type","pettern")
      marker.setAttribute("url",toy.marker_pettern_url)
      marker.setAttribute("cursor",{rayOrigin:"mouse"})
      marker.setAttribute("markerhandler",{})
      mainScene.appendChild(marker)

      model.setAttribute("id", `model-${toy.id}`);
      model.setAttribute("position", toy.model_geometry.position);
      model.setAttribute("rotation", toy.model_geometry.rotation);
      model.setAttribute("scale", toy.model_geometry.scale);
      model.setAttribute("gltf-model", `url(${toy.model_url})`);
      model.setAttribute("gesture-handler", {});
      marker.appendChild(model);

    })
  },
  getToys:async function(){
    return await firebase.firestore().collection("toys").get().then(snap=>{
      return snap.docs.map(doc=>doc.data())
    })
  }

  });

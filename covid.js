
profile.innerHTML = `
<div class="col-12">
<div class="justify-content-center" style="
   margin: 20px;
// border: 3px solid #73AD21;
   padding: 10px;
  text-align: center; ">
  
  <img style="transform: scale(1.2);" src="https://images.uncyc.org/pt/9/9a/Warmachine-win1.gif"/>
</div>
</div>`;


(function(){

    const search = document.getElementById("search");
    const profile = document.getElementById("profile");

    const brasil = "https://covid19-brazil-api.now.sh/api/report/v1/brazil";
    const url = "https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf";
    
    async function getEstados(estado){
        
        
        const dadosEstado = await fetch(`${url}/${estado}`, {mode: 'cors'});        
        const dadosBrasil = await fetch(`${brasil}`);        
          

        const estadoRes = await dadosEstado.json();
        const brasilRes = await dadosBrasil.json();

        return {estadoRes, brasilRes};
        
    }  



    function showProfile(estado){
        var hora = estado.datetime;
        var horaNew = hora.slice(0,10); // recorta 
        var horaTotal = horaNew.split('-',3)

        profile.innerHTML = `
            <div class="col-md-6 col-sm-12 mb-3">
                <div class="card" style="width: 18rekm;">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Estado: <span class="badge badge-success">${estado.state}</span></li>
                        <li class="list-group-item">Casos: <span class="badge badge-primary">${estado.cases}</span></li>
                        <li class="list-group-item">Suspeitos: <span class="badge badge-warning">${estado.suspects}</span></li>
                        <li class="list-group-item">Mortes: <span class="badge badge-danger">${estado.deaths}</span></li>
                        <li class="list-group-item">Última atualização: ${horaTotal[2]}/${horaTotal[1]}/${horaTotal[0]} </li>
                    </ul>     
                    <div class="card-body">
                        <a href="" target="_blank" class="btn btn-primary btn-block">Ver mais</a>
                    </div>
                </div>
            
            `;
      
    }

    function showRepos(brasilRes){
        var brasilRes = brasilRes.data;
        var hora = brasilRes.updated_at;
        var horaNew = hora.slice(0,10); // recorta 
        var horaTotal = horaNew.split('-',3)

        profile.innerHTML += `      
            <div class="col-md-6 col-sm-12">
                <div class="card" style="width: 18rekm;">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">País: <span class="badge badge-success">${brasilRes.country}</span></li>
                        <li class="list-group-item">Casos: <span class="badge badge-primary">${brasilRes.cases}</span></li>
                        <li class="list-group-item">Confirmados: <span class="badge badge-warning">${brasilRes.confirmed}</span></li>
                        <li class="list-group-item">Mortes: <span class="badge badge-danger">${brasilRes.deaths}</span></li>
                        <li class="list-group-item">Última atualização: ${horaTotal[2]}/${horaTotal[1]}/${horaTotal[0]} </li>
                    </ul>     
                    <div class="card-body">
                        <a href="" target="_blank" class="btn btn-primary btn-block">Ver mais</a>
                    </div>
                </div>
            </div>`
    };
        
    /*
    search.addEventListener("keyup", (e) => {
        if(busca.length > 0){
            getEstados(busca).then(res => {
                profile.innerHTML = '';
                showProfile(res.estadoRes);
                showRepos(res.brasilRes);
            });        
        } else if (busca.length = 0){
            console.log("else");
        }
       
    }); método para ouvir o campo, tecla */

    search.addEventListener("change", exibeEstado);

    function exibeEstado(){
         getEstados(search.value).then(res => {
                profile.innerHTML = '';
                showProfile(res.estadoRes);
                showRepos(res.brasilRes);
            });        
    }
})();


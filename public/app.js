 const getAll = document.querySelector('#viewAll')
 const cre= document.querySelector('#create')
 const getSpec = document.querySelector('#viewSpe')
 const upda = document.querySelector('#update')
 const dele = document.querySelector('#delete')
 const main = document.querySelector('.contain')
 const msg = document.querySelector('.reply')
 const user = document.querySelector('#user')
 const run = document.querySelector('#run')
 const rating = document.querySelector('#rating')
 const distance = document.querySelector('#distance')
 const ndate = document.querySelector('#date')
 const time = document.querySelector('#time')
 const loadAll = ()=>{
    fetch('https://glacial-escarpment-18984.herokuapp.com/api/runs/')
        .then(async(result)=>{
            let text =await result.text();
            //let jdata = await result.json()
            //console.log(jdata)
            main.innerHTML= text
        })
    }

 getAll.addEventListener('click', loadAll)


getSpec.addEventListener('click', (e)=>{
   let specInp = run.value 
    fetch(`https://glacial-escarpment-18984.herokuapp.com/api/runs/${specInp}`)
        .then(async(resu)=>{
            let text = await resu.text()
            
            main.innerHTML= text;
        })
    })
cre.addEventListener('click', (e)=>{
    fetch('https://glacial-escarpment-18984.herokuapp.com/api/runs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'user_id': user.value, 'rate': rating.value, 'date': `'${date.value}'`, 'distance': distance.value, 'time': time.value
        })
    })
    
        .then(async(resul)=>{

            let text =await resul.text();
           //ttach to module 
           //asep data check if it returns a promise (add await)
           //console.log(text)
            msg.innerHTML= text
        })
     }
)

    upda.addEventListener('click', (e)=>{
        let updaInput = run.value
        console.log(updaInput)
        fetch(`https://glacial-escarpment-18984.herokuapp.com/api/runs/${updaInput}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'user_i': user.value, 'rat': rating.value, 'dat': `'${date.value}'`, 'distanc': distance.value, 'tim':time.value
            })
        })
        
            .then(async(resul)=>{
    
                let text =await resul.text();
               //ttach to module 
               //asep data check if it returns a promise (add await)
               //console.log(text)
                msg.innerHTML= text
            })
         }
    )

    dele.addEventListener('click', ()=>{
        let delInput = run.value;
        fetch(`https://glacial-escarpment-18984.herokuapp.com/api/runs/${delInput}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }

        })
        
            .then(async(result)=>{
    
                let text = await result.text();
                msg.innerHTML= text
            })

        })


        loadAll()
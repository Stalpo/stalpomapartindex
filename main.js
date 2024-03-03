const smiCount = 3571;

const allmaps = document.getElementById('all');
const byMapButton = document.getElementById('byMap');
const byShulkButton = document.getElementById('byShulk');
const bySMIButton = document.getElementById('bySMI');
const byLargestButton = document.getElementById('byLargest');

byMapButton.addEventListener("click", displayByMap);
byShulkButton.addEventListener("click", displayByShulk);
bySMIButton.addEventListener("click", displayBySMI);
byLargestButton.addEventListener("click", displayByLargest);

displayByMap();

function displayByMap(){
    byMapButton.className = "selected";
    byShulkButton.className = "";
    bySMIButton.className = "";
    byLargestButton.className = "";

    allmaps.innerHTML = "";

    mapList.sort(compareStartIndex);
    let nextMap = 0;
    for(let smi = 1; smi <= smiCount; smi++){
        if(smi == mapList[nextMap].startIndex){
            if(mapList[nextMap].weird){
                const mapDiv = document.createElement('div');
                mapDiv.setAttribute("style","width:" + mapList[nextMap].width * 128 + "px");
                mapDiv.className = "map";
                allmaps.appendChild(mapDiv);
                let maxsmi = 0;
                for(let i = 0; i < mapList[nextMap].size; i++){
                    addMap(mapDiv, smi + mapList[nextMap].maps[i][0], mapList[nextMap].maps[i][1] * 90);
                    if(smi + mapList[nextMap].maps[i][0] > maxsmi){
                        maxsmi = smi + mapList[nextMap].maps[i][0];
                    }
                }
                smi = maxsmi;
                nextMap++;
            }else{
                const mapDiv = document.createElement('div');
                mapDiv.setAttribute("style","width:" + mapList[nextMap].width * 128 + "px");
                mapDiv.className = "map";
                allmaps.appendChild(mapDiv);
                while(smi - mapList[nextMap].startIndex < mapList[nextMap].size){
                    addMap(mapDiv, smi);
                    smi++;
                }
                nextMap++;
                smi--;
            }
            if(nextMap == mapList.length){
                nextMap = 0;
            }
        }else{
            addMap(allmaps, smi);
        }
    }
}

function displayByShulk(){
    byMapButton.className = "";
    byShulkButton.className = "selected";
    bySMIButton.className = "";
    byLargestButton.className = "";

    allmaps.innerHTML = "";

    for(let shulk = 1; shulk <= Math.floor((smiCount - 1) / 27) + 1; shulk++){
        const shulkDiv = document.createElement('div');
        shulkDiv.id = "shulk" + shulk;
        shulkDiv.className = "shulk";
        const shulkTitle = document.createElement('h2');
        shulkTitle.innerHTML = "Shulk #" + shulk;
        allmaps.appendChild(shulkDiv);
        shulkDiv.appendChild(shulkTitle);
        for(let smi = (shulk - 1) * 27 + 1; smi <= shulk * 27 && smi <= smiCount; smi++){
            addMap(shulkDiv, smi);
        }
    }
}

function displayBySMI(){
    byMapButton.className = "";
    byShulkButton.className = "";
    bySMIButton.className = "selected";
    byLargestButton.className = "";

    allmaps.innerHTML = "";

    for(let smi = 1; smi <= smiCount; smi++){
        addMap(allmaps, smi);
    }
}

function displayByLargest(){
    byMapButton.className = "";
    byShulkButton.className = "";
    bySMIButton.className = "";
    byLargestButton.className = "selected";

    allmaps.innerHTML = "";

    mapList.sort(compareSize);
    mapList.forEach(m => {
        smi = m.startIndex;
        if(m.weird){
            const mapDiv = document.createElement('div');
            mapDiv.setAttribute("style","width:" + m.width * 128 + "px");
            mapDiv.className = "map";
            allmaps.appendChild(mapDiv);
            for(let i = 0; i < m.size; i++){
                addMap(mapDiv, smi + m.maps[i][0],m.maps[i][1] * 90);
            }
        }else{
            const mapDiv = document.createElement('div');
            mapDiv.setAttribute("style","width:" + m.width * 128 + "px");
            mapDiv.className = "map";
            allmaps.appendChild(mapDiv);
            while(smi - m.startIndex < m.size){
                addMap(mapDiv, smi);
                smi++;
            }
        }
    });
}

function addMap(div, smi){
    const filePath = 'maparts_smi/SMI_' + smi + '_' + (Math.floor((smi - 1) / 27) + 1)+ '_' +(((smi - 1) % 27) + 1) + '.png';
    const img = document.createElement('img');
    img.src = filePath;
    img.alt = 'SMI_' + smi + '_' + (Math.floor((smi - 1) / 27) + 1)+ '_' +(((smi - 1) % 27) + 1);
    div.appendChild(img);
}

function addMap(div, smi, angle){
    const filePath = 'maparts_smi/SMI_' + smi + '_' + (Math.floor((smi - 1) / 27) + 1)+ '_' +(((smi - 1) % 27) + 1) + '.png';
    const img = document.createElement('img');
    img.src = filePath;
    img.alt = 'SMI_' + smi + '_' + (Math.floor((smi - 1) / 27) + 1)+ '_' +(((smi - 1) % 27) + 1);
    
    img.setAttribute("style","transform: rotate(" + angle + "deg)");
    div.appendChild(img);
}
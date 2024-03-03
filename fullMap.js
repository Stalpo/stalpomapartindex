class FullMap{
    constructor(name, startIndex, width, height, weird) {
        if (weird===undefined){
            this.weird = false;

            this.name = name;
            this.startIndex = startIndex;
            this.width = width;
            this.height = height;
            this.size = width * height;
        }else{
            this.weird = true;

            this.name = name;
            this.startIndex = startIndex;
            this.width = width;
            this.height = height;
            this.size = width * height;
    
            this.maps = weird;
        }
    }
}
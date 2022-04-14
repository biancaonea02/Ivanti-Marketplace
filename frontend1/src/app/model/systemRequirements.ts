export class SystemRequirements {
    public processorType: String;
    public ram: String;
    public graphicsCard: String;

    constructor(processorType: String, ram: String, graphicsCard: String) {
        this.processorType = processorType;
        this.ram = ram;
        this.graphicsCard = graphicsCard;
    }
}
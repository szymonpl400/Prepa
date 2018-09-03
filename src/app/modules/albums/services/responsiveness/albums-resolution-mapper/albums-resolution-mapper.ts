export abstract class AlbumsResolutionMapper<T> {
    abstract calculate(resolution: number): T;
    protected abstract getMapping(): { [resolution: number]: T };

    protected findMaxValueForResolution(resolution: number, mapping: { [resolution: number]: T }) {
        const narrowedValues = Object.keys(mapping).map(key => parseFloat(key)).filter(num => num <= resolution);
        const max = Math.max(...narrowedValues);
        return mapping[max];
    }
}

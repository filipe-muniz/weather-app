type Props = {
    pathImg: string;
    width: number;
    height: number;
    alt?: string;
};

export function Image({ pathImg, width, height, alt = '' }: Props) {
    return <img src={pathImg} width={width} height={height} alt={alt} />;
}

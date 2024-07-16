type Props = {
    pathImg: string;
    width: number;
    height: number;
};
export function Image(props:Props){
    return(
        <img src={props.pathImg}  width={props.width} height={props.height}/>
    )
}
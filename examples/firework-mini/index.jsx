const App = () => {

    const onUpdate = (rect)=>{
        rect.x += 1
    }
    return (
        <Canvas>
            <Rect x={rectX} y={} update={onUpdate}/>
            <Rect/>
            <Rect/>
            <Rect/>
        </Canvas>

    )
}

import React, {RefObject, useEffect, useRef} from 'react';
import {IRampColors} from "../App";



interface IProps {
    inputColors: IRampColors;
    onCanvasDataChange: (data: Uint8Array) => void;
}

function CanvasElement({inputColors, onCanvasDataChange}: IProps) {
    const width = 256;
    const height = 1;

    const dataCanvas = useRef<HTMLCanvasElement>(document.createElement('canvas'));
    const visualisationCanvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        try {
            if (!inputColors) {
                return;
            }

            const colors = eval('(' + inputColors + ')');

            const data = getColorRamp(colors, width, height, dataCanvas)!;
            onCanvasDataChange(data);
            getColorRamp(colors, width * 2, height * 40, visualisationCanvas);
        } catch (e) {
            alert('Bad JS Code ' + e);
        }


    }, [dataCanvas, inputColors]);


    const getColorRamp = (colors: IRampColors, width: number, height: number, ref: RefObject<HTMLCanvasElement>): Uint8Array | undefined => {
        const canvas = ref.current;

        if (!canvas) {
            return;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d')!;

        const gradient = ctx.createLinearGradient(0, 0, 256, 0);
        for (const stop in colors) {
            if (colors.hasOwnProperty(stop)) {
                gradient.addColorStop(+stop, colors[stop]);
            }
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        return new Uint8Array(ctx.getImageData(0, 0, width, height).data);
    }

    return (
        <canvas ref={visualisationCanvas} style={{
            margin: '15px 0'
        }}/>
    );
}

export default CanvasElement;

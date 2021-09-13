import React, {useState} from 'react';
import './App.css';
import {Button, Container, FormLabel, Grid, TextareaAutosize} from "@material-ui/core";
import CanvasElement from "./Canvas/Canvas";

export interface IRampColors {
    [key: number]: string;
}

const initValue = `{
      [0 / 255]: '#9a00bb',
      [20 / 255]: '#1b0095',
      [40 / 255]: '#038cbe',
      [60 / 255]: '#5b8e19',
      [80 / 255]: '#bc9203',
      [100 / 255]: '#bd6004',
      [120 / 255]: '#bd4b03',
      [140 / 255]: '#bf3d01',
      [160 / 255]: '#bd2802',
      [180 / 255]: '#bf1401',
      [200 / 255]: '#bf0300',
      [255 / 255]: '#bf0300',
    }`;

function App() {
    const [inputStateTemp, setInputStateTemp] = useState(initValue);
    const [inputState, setInputState] = useState(initValue);
    const [outputState, setOutputState] = useState('');

    const handleCanvasDataChange = (data: Uint8Array) => {
        const preparedObjCString = `int const customNameColorRamp[1024] = {${String(data)}};`
        setOutputState(preparedObjCString);
    }

    return (
        <div className="App" style={{
            padding: '15px 0',
            backgroundColor: 'rgba(211, 211, 211, 0.15)',
            minHeight: '100vh'
        }}>
            <Container maxWidth="sm">
                <form noValidate autoComplete="off">
                    <Grid style={{
                        padding: '20px 0'
                    }}>
                        <FormLabel style={{
                            fontSize: '25px'
                        }}>Put here array of stops & colors</FormLabel>
                        <TextareaAutosize
                            minRows={10}
                            value={initValue}
                            style={{
                                width: '100%',
                                margin: '20px 0'
                            }}
                            onChange={(event) => setInputStateTemp(event.target.value)}
                        />
                        <Button variant={"contained"}
                                onClick={() => {
                                    setInputState(inputStateTemp);
                                }}>
                            Convert
                        </Button>
                    </Grid>
                    <Grid>
                        <CanvasElement inputColors={inputState} onCanvasDataChange={handleCanvasDataChange}/>
                        <FormLabel style={{
                            fontSize: '18px',
                        }}>Copy this header to constants.h</FormLabel>
                        <TextareaAutosize
                            minRows={1}
                            style={{
                                width: '100%',
                                margin: '20px 0'
                            }}
                            value={'extern int const customNameColorRamp[1024];'}
                        />
                        <FormLabel style={{
                            fontSize: '18px'
                        }}>Copy this variable to constants.m</FormLabel>
                        <TextareaAutosize
                            minRows={10}
                            style={{
                                width: '100%',
                                margin: '20px 0'
                            }}
                            value={outputState}
                        />
                    </Grid>
                </form>
            </Container>
        </div>
    );
}

export default App;

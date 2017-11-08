/**
    @__Guillaume  
*/

import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, PanResponder, Easing } from 'react-native';

const WAVE_HEIGHT = 60;
let HEIGHT = undefined;
let BLOCK_HEIGHT = 0;
let ptr = 0;
let dir = 1;
let INC = 0.04;
let WAVE_LENGTH = 4;
let HEADER_OFFSET = 0;

export default class WavyScrollController extends Component {

    constructor(props) {
        super(props);
        this.sections = props.dataSource.map((el, idx) => {
            let _isSelected = new Animated.Value(0);
            return {
                char: el.title, offset: new Animated.Value(0), isSelected: _isSelected,
                bgColor: _isSelected.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['#FFF', 'orangered']
                })
            }
        })
        this.currentPos = undefined;
        this.originY = 0;
    }


    mapVal(d){
        return Math.sin((WAVE_LENGTH-d)/WAVE_LENGTH)*WAVE_HEIGHT*-1;
    }

    componentDidMount() {

    }

    step(initial) {
        if (this.currentPos) {
            let _idx = this.currentPos / BLOCK_HEIGHT;
            this.sections.forEach((el, idx) => {
                let _dst = Math.abs(idx - _idx);
                el.offset.stopAnimation();
                if (_dst < WAVE_LENGTH) {
                    let _prevSel = el.isSelected._value;
                    el.isSelected.setValue(Math.floor(_idx) == idx ? 1 : 0);
                    if (_prevSel == 0 && el.isSelected._value == 1) {
                        this.props.onScrollToSection(Math.floor(_idx));
                    }
                    
                    if (initial) {
                        Animated.timing(
                            el.offset, {
                                toValue: this.mapVal(_dst), duration: 750,
                                easing: Easing.elastic(1.5)
                            })
                            .start();
                    }
                    else
                        el.offset.setValue(this.mapVal(_dst));
                }
                else {
                   
                    el.offset.setValue(0);
                }
            });

            ptr += INC * dir;
            let _next = Math.sin(ptr) * HEIGHT;
            if (_next > HEIGHT) {
                ptr = HEIGHT;
                dir = dir * -1;
            }
            else if (_next < 0) {
                ptr = 0;
                dir = dir * -1;
            }
        }
        else {
            this.sections.forEach((el) => {
                el.offset.stopAnimation();
                el.isSelected.setValue(0);
                Animated.timing(
                    el.offset, {
                        toValue: 0, duration: 750,
                        easing: Easing.elastic(1.5)
                    })
                    .start();
            });
        }
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,


            onPanResponderGrant: (evt, gestureState) => {
                this.originY = gestureState.y0 - HEADER_OFFSET;
                this.currentPos = this.originY;
                this.step(true);
            },
            onPanResponderMove: (evt, gestureState) => {
                this.currentPos = this.originY + gestureState.dy;
                this.step();
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                this.currentPos = undefined;
                this.step();
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                return true;
            },
        });
    }

    render() {
        return (
            <View style={localStyles.container} onLayout={(evt) => {

                HEADER_OFFSET = this.props.vOffset;
                HEIGHT = evt.nativeEvent.layout.height;
                BLOCK_HEIGHT = Math.round(HEIGHT / this.sections.length);
            }}
                {...this._panResponder.panHandlers}
            >
                {
                    this.sections.map((el, idx) => {
                        return <Animated.Text style={[localStyles.anchor, {
                            transform: [{ translateX: el.offset }],
                            color: el.bgColor
                        }]} key={el.char + '_'} >{el.char}</Animated.Text>
                    })
                }
            </View>
        )
    }
}

const localStyles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 80,
        paddingRight: 10
    },
    anchor: {
        fontWeight: 'bold',
        alignSelf: 'flex-end'
    }
})

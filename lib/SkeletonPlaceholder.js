"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const masked_view_1 = __importDefault(require("@react-native-community/masked-view"));
const react_native_linear_gradient_1 = __importDefault(require("react-native-linear-gradient"));
const SCREEN_WIDTH = react_native_1.Dimensions.get("window").width;
function SkeletonPlaceholder({ children, backgroundColor = "#E1E9EE", speed = 800, highlightColor = "#F2F8FC", direction = "right", }) {
    const [layout, setLayout] = React.useState();
    const animatedValue = React.useMemo(() => new react_native_1.Animated.Value(0), []);
    const translateX = React.useMemo(() => animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: direction === "right"
            ? [-SCREEN_WIDTH, SCREEN_WIDTH]
            : [SCREEN_WIDTH, -SCREEN_WIDTH],
    }), [animatedValue]);
    React.useEffect(() => {
        if (speed > 0) {
            const loop = react_native_1.Animated.loop(react_native_1.Animated.timing(animatedValue, {
                toValue: 1,
                duration: speed,
                easing: react_native_1.Easing.ease,
                useNativeDriver: true,
            }));
            if ((layout === null || layout === void 0 ? void 0 : layout.width) && (layout === null || layout === void 0 ? void 0 : layout.height)) {
                loop.start();
            }
            return () => loop.stop();
        }
        return;
    }, [animatedValue, speed, layout === null || layout === void 0 ? void 0 : layout.width, layout === null || layout === void 0 ? void 0 : layout.height]);
    const absoluteTranslateStyle = React.useMemo(() => (Object.assign(Object.assign({}, react_native_1.StyleSheet.absoluteFillObject), { transform: [{ translateX }] })), [translateX]);
    const viewStyle = React.useMemo(() => ({ backgroundColor, overflow: "hidden" }), [backgroundColor]);
    const getChildren = React.useCallback((element) => {
        return React.Children.map(element, (child, index) => {
            let style;
            if (child.type.displayName === "SkeletonPlaceholderItem") {
                const _a = child.props, { children } = _a, styles = __rest(_a, ["children"]);
                style = styles;
            }
            else {
                style = child.props.style;
            }
            if (child.props.children) {
                return (<react_native_1.View key={index} style={style}>
                {getChildren(child.props.children)}
              </react_native_1.View>);
            }
            else {
                return (<react_native_1.View key={index} style={styles.childContainer}>
                <react_native_1.View style={[style, viewStyle]}/>
              </react_native_1.View>);
            }
        });
    }, [viewStyle]);
    return (layout === null || layout === void 0 ? void 0 : layout.width) && (layout === null || layout === void 0 ? void 0 : layout.height) ? (<masked_view_1.default style={{ height: layout.height, width: layout.width }} maskElement={<react_native_1.View style={{
        backgroundColor: "transparent",
    }}>
          {getChildren(children)}
        </react_native_1.View>}>
      <react_native_1.View style={{ flexGrow: 1, backgroundColor }}/>
      {speed > 0 && (<react_native_1.Animated.View style={[
        {
            flexDirection: "row",
        },
        absoluteTranslateStyle,
    ]}>
          <masked_view_1.default style={react_native_1.StyleSheet.absoluteFill} maskElement={<react_native_linear_gradient_1.default start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[react_native_1.StyleSheet.absoluteFill]} colors={["transparent", "black", "transparent"]}/>}>
            <react_native_1.View style={[
        react_native_1.StyleSheet.absoluteFill,
        { backgroundColor: highlightColor },
    ]}></react_native_1.View>
          </masked_view_1.default>
        </react_native_1.Animated.View>)}
    </masked_view_1.default>) : (<react_native_1.View onLayout={(event) => {
        setLayout(event.nativeEvent.layout);
    }}>
      {getChildren(children)}
    </react_native_1.View>);
}
exports.default = SkeletonPlaceholder;
SkeletonPlaceholder.Item = (_a) => {
    var { children } = _a, style = __rest(_a, ["children"]);
    return (<react_native_1.View style={style}>{children}</react_native_1.View>);
};
//@ts-ignore
SkeletonPlaceholder.Item.displayName = "SkeletonPlaceholderItem";
const styles = react_native_1.StyleSheet.create({
    childContainer: {
        position: "relative",
    },
    gradient: {
        flex: 1,
    },
});
//# sourceMappingURL=SkeletonPlaceholder.js.map
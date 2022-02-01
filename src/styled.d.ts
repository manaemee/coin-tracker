import "styled-components";

declare module 'styled-components'{
    export interface DefaultTheme{
        textColor:string;
        bgColor:string;
        darkColor:string;
        accentColor:string;
        accentBgColor:string;
    }
}
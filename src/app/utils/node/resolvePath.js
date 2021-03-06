import { isWin } from "utils/node/platform";
import PATH from "path";


const reVarWindows = /%([^%]+)%/g;
const reVarUnix    = /\$([A-Z_]+)/g;

function fnVarReplace( _, v ) {
	return process.env[ v ];
}

function resolvePathWindows( path ) {
	path = path.replace( reVarWindows, fnVarReplace );
	return PATH.resolve( path );
}

function resolvePathUnix( path ) {
	path = path.replace( reVarUnix, fnVarReplace );
	return PATH.resolve( path );
}

const resolvePath = isWin
	? resolvePathWindows
	: resolvePathUnix;


export default resolvePath;

<?php
/* if it is from browser*/
if (!empty($_SERVER['PATH_INFO'])) {
    $request_path = $_SERVER['PATH_INFO'];
}

/* if is a call from console, override it */
if (! empty($_SERVER['argv'][0]) && ! empty($_SERVER['argv'][1])) {
	$request_path = trim($_SERVER['argv'][1]);

	/*parameters*/
	if(!empty($_SERVER['argv'][2])){
		$params = explode('-p:',$_SERVER['argv'][2]);
		$json = preg_replace('/(?<!")(?<!\w)(\w+)(?!")(?!\w)/', '"$1"', $params[1]);
		$_POST= json_decode($json, true); 
		
	}
}

$file = dirname(__FILE__) . '/' . $request_path;
if (file_exists($file)) {
    $file_content = file_get_contents($file);
    $extension = preg_replace("/^.*(\.\w+)$/", "$1", $file);
    switch ($extension) {
        case '.js':
            $content_type = "text/javascript";
            break;
        case '.css':
            $content_type = "text/css";
            break;
        case '.html':
            $content_type = "text/html";
            break;
        default:
            $content_type = "text/plain";
    }
    header("Content-type: $content_type");
    echo $file_content;
    exit();
}

$parts = preg_split("/\//i", $request_path, null, PREG_SPLIT_NO_EMPTY);
$clazz = ucfirst($parts[0]);

$controller_path = dirname(__FILE__) . '/controllers/';   
$method = isset($parts[1]) ? $parts[1] : 'index';

$classfile = $controller_path . "{$clazz}_Controller.php";
$classname = $clazz . '_Controller';

/* open it*/
if (file_exists($classfile)) {
	include_once $classfile;
	if (class_exists($classname)) {
		$controller = new $classname();
		if (method_exists($controller, $method)) {
			$controller->$method();
		}
	}
} else {
	echo $classfile;
}

?>

<?php
class Api_Controller 
{
	function __construct(){
	}

    public function sayHi()
    {
    	if(empty($_POST['name']) || empty($_POST['age']) || empty($_POST['sleep'])){   	
    		echo '{"msg":"faltan parametros"}';
    	}
    	sleep($_POST['sleep']);    	
    	echo '{"msg":"hola '.$_POST['name'].'. Tenes '.$_POST['age'].' ? . Sleep: "'.$_POST['sleep'].'"}';
    	
    }
    
}
?>
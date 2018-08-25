extends Control

# instance
var websocket

# entry point
func _ready():
	websocket = preload("res://websocket.gd").new(self)
	websocket.start("127.0.0.1",8080)
	websocket.set_reciever(self,"message")
	
# handler to text messages
func message(msg):
	print(msg)

# handler to some button on you scene
func _on_some_button_released():
	websocket.send("Some short message here")
	print("send?")

module.exports=require('apps/drawapp').extend({
tools:{Rect:{
col:'red',
id:0,
borderRadius:20,
shadowOffset:[5,5],
borderColor:'white',
borderWidth:2,
pixelStyle:function(){$
this.color=mix('white',this.color,abs(
sin(sin(this.time+this.id)*8.*length(
this.mesh.xy-vec2(.5+.5*sin(this.time+this.id))
)+this.time)
))
}
}},
onFingerDown:function(){
this.redraw()
},
onDraw:function(){
for(var i=0;i<100;i++){
this.drawRect({
id:i,
color:[random(),random(),random(),1],
x:(i%10)*100,
y:floor(i/10)*100,
w:100,
h:100
})
}
}
})
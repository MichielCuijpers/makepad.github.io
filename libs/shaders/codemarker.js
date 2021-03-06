var types = require('base/types')
var painter = require('services/painter')

module.exports = class CodeMarker extends require('shaders/quad'){

	prototype(){
		// special
		this.props = {
			x1:0.,
			x2:0.,
			x3:0.,
			x4:0.,
			level:0.,
			borderRadius:2.,
			borderWidth:1.,
			closed:0,
			
			bgColor: {pack:'float12', value:'gray'},
			opColor: {pack:'float12', value:'gray'},
			borderColor: {pack:'float12', value:'gray'},

			errorAnim:{kind:'uniform', animate:1, value:[0,0,0,0]},

			opMargin:{kind:'uniform', value:2},
			noBounds: {kind:'uniform',value:0},
			turtleClip:{kind:'uniform',value:[-50000,-50000,50000,50000]},
			visible:{kind:'uniform', value:1.},
			tween: {kind:'uniform', value:2.},
			ease: {kind:'uniform', value:[0,0,1.0,1.0]},
			duration: {noTween:1., value:0.},
			delay: {styleLevel:1, value:0.},
			moveScroll:{kind:'uniform', noTween:1, value:1.}
		}
		
		this.verbs = {
			stop:function(o, x1, x2, x3, x4, h){
				this.$PROP[o,'x1'] = x1
				this.$PROP[o,'x2'] = x2
				this.$PROP[o,'x3'] = x3
				this.$PROP[o,'x4'] = x4
				this.$PROP[o,'h'] = h
			},
			$setTweenStart:function(o, v){
				this.$PROP[o, 'tweenStart'] = v
			},
			start:function(y, level, style){
				this.$ALLOCDRAW(1)
				this.$WRITEPROPS({
					duration:$proto.duration,
					y:y,
					closed:0,
					level:level,
					borderRadius:style.borderRadius,
					bgColor:style.bgColor,
					opColor:style.opColor,
					borderColor:style.borderColor,
					borderWidth:style.borderWidth,
				})
				return this.$PROPLEN - 1
			}
		}
		this.noInterrupt = 1
	}

	vertexPre(){$
		this.x = this.x1
		this.w = this.x4 - this.x1
		this.h+=2.
		//this.errorTime = 1.-this.animateUniform(this.errorAnim)
	}
		

	pixel(){$
		//return 'red'
		var bg = '#09000000'
		var pos = this.viewport()
		this.result = bg
		this.pos.x = mod(this.pos.x,8.)
		this.moveTo(0., this.h - 1.)
		this.lineTo(3., this.h - 1.)
		this.stroke('#c00',1.)
		this.pos = pos
		if(this.pos.x < this.h*0.2) this.result = bg
		if(this.pos.x > this.x2) this.result = bg

		this.circle(this.h*0.25,this.h*0.75-2.,this.h*.2)
		this.fill('#c00')
		var start = this.x2 + this.h*0.2
		var end = this.x3 - this.h*0.2
		this.moveTo(start, this.h - 1.)
		this.lineTo(start+(end-start)*0.5, this.h - 2.)
		this.lineTo(end, this.h - 1.)
		this.stroke('#ccc',1.)


		return this.result
		/*
		var p = this.mesh.xy * vec2(this.w, this.h)

		var aa = this.antialias(p)
		
		// background field
		var bgDist = this.boxDistance(p, 0., 0., this.w, this.h, this.borderRadius)
		var opDist = this.boxDistance(
			p,
			this.x2 - this.x1 + this.opMargin, 
			this.opMargin,
			this.x3 - this.x2 - this.opMargin*2.,
			this.h - this.opMargin *2.,
			max(this.borderRadius -2.,0.)
		)
	
		var rip = (1.5+.5*sin(p.x*.4)+p.x)*(this.closed)*10.
		bgDist += rip
		opDist += rip

		var final = this.colorBorderDistance(aa, bgDist, this.borderWidth, this.bgColor, this.borderColor)
		return mix(this.opColor, final, clamp(opDist * aa + 1., 0., 1.))
		*/
	}
}
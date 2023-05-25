# JS之prototype

## 什么是prototype

JavaScript中的对象有一个特殊的`Prototype`内置属性，其实就是对其他对象的引用，几乎所有的对象在创建时`Prototype`属性都会被赋予一个非空的值。

请看

```js
var myObj = {
    a:2
}
console.log(myObj.a) // 2
```



显而易见，myObj这个对象里面有一个属性是a，它被赋予的值为2，所以我们console.log(myObj.a)的时候就能找到它。

但是，请再看

```js
var myObj = {
    
}
var another = {
    a:2
}
//将myObj关联到another上
myObj = Object.create(another)
console.log(myObj.a) // 2
```



显然，myObj里并没有属性a，但是为什么myObj.a仍然能够输出2呢？这就是**原型链**。如果对象无法在它自身找到所需要访问的属性，就会继续访问对象的`Prototype`链。

## 为什么需要原型链
准确的来说，我认为JavaScript是一个真正面向**对象**的语言，其他类似于C++，java实际上都是面向**类**。
为什么呢？在java中，我们可以通过建立一个类来构造对象，类和类之间可以继承，从而实现一些实例之间的关联。然而，在JavaScript中**并没有类**，它只有对象，那怎么样才能实现像java那样实例之间的关联呢？就是通过**Prototype**，用对象构造对象。

## 怎样模仿‘类’

JavaScript函数中有一个这样的特殊特性：**所有的函数默认都会拥有一个名为prototype的共有且不可枚举的属性，它会指向另一个对象**。
是什么意思呢，可能这样说会好懂一点：**函数都会拥有一个原型对象，通过 函数名.prototype 去引用它**。

```js
function foo(){
    //
}

foo.prototype // {}
```



可是这和类又有什么关系呢，我们常常会见到这样的代码

```js
function Foo(a){
    this.a  = a;
    //...
}
var m = new Foo()
```



我们在调用new Foo的时候，实际上会创建一个新对象，并将这个新对象的`prototype`链接到Foo的原型对象上（也就是Foo.prototype所指向的对象）。
在面向类的语言中，类可以被实例化多次（创建多个实例化对象），就像用模具制作东西一样，一个类的实例化就意味着把类的属性和行为复制到一个具体的物理对象中，但是在JavaScript中并没有类，你只能创建多个对象，然后把这些对象的`prototype`链链接（或者说关联）到同一个对象中，就这样间接地实现类机制。

<git-talk />
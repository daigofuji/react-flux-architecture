import {dispatch, register} from '../dispatchers/app-dispatcher';
import AppCOnstants from '../constanst/app-constants';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change'

var _catalog = [];

for (let i = 1; i < 9; i++) {
	_catalog.push({
		'id': 'Widget' + i,
		'title': 'Widget #' + i,
		'summary': 'A great widget',
		'description': 'Discription text goes here like this he re here here.',
		'cost': i
	})
}
 
var _cartItems =[];

const _removeItem = (item) => {
	_cartItems.splice(_cartItems.findIndex(i => i === item), 1);
};

const _findCartItem = (item) => {
	return _cartItems.find(cartItem => cartItem.id === item.id);
};

const _increaseItem = (item) => item.qty++;

const _decreaseItem = (item) => {
	item.qty--;
	if (item.qty === 0) {
		_removeItem(item);
	}
}

const _addItem = (item) => {
	const cartItem = _findCartItem(item);
	if (!cartItem) {
		_cartItems.push(Object.assign({qty:1}, item));
	} else {
		_inderaseItem(cartItem);
	}
}

const _cartTotals = (qty = 0, total = 0) => {
	_cartItems.forEach( cartItem => {
		qty += cartItem.qty;
		total += cartItem.qty * cartItem.cost;
	});
	return {qty, total};
}

const AppStore = Object.assign(EventEmitter.prototype, {
	emitChange(){
		this.emit(CHANGE_EVENT)
	},
	addChangeLister(callback){
		this.on(CHANGE_EVENT, callback)
	},
	removeChangeLister(callback){
		this.removeListener(CHANGE_EVENT, callback)
	},
	getCart(){
		return _cartItems;
	},
	getCatalog(){
		return _catalog.map(item => {
			return Object.assign({}, item, _cartItem.find(cItem => cItem.id === item.id))
		})
	},
	getCartTotals() {
		return _cartTotals();
	},
	dispatcherIndex: register(function(action){
		switch(action.actionType){
			case AppConstatns.ADD_ITEM:
				_addItem(action.item);
				break;
			case AppConstatns.REMOVE_ITEM:
				_removeItem(action.item);
				break;
			case AppConstatns.INCREASE_ITEM:
				_increaseItem(action.item);
				break;
			case AppConstatns.DECREASE_ITEM:
				_recreaseItem(action.item);
				break;
		}
	}
	AppStore.emitChange;

})

export default AppStore;
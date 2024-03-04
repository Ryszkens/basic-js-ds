const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
	constructor() {
		this.rootNode = null;
	}

	root() {
		return this.rootNode;
	}

	add(data) {
		this.rootNode = addData(this.rootNode, data);

		function addData(node, data) {
			if (!node) return new Node(data);

			if (node.data === data) return node;

			if (data > node.data) {
				node.right = addData(node.right, data);
			} else {
				node.left = addData(node.left, data);
			}

			return node;
		}
	}

	has(data) {
		return checkIfHasData(this.rootNode, data);

		function checkIfHasData(node, data) {
			if (!node) return false;

			if (node.data === data) return true;

			if (data > node.data) {
				return checkIfHasData(node.right, data);
			} else {
				return checkIfHasData(node.left, data);
			}
		}
	}

	find(data) {
		return findData(this.rootNode, data);

		function findData(node, data) {
			if (!node) return null;

			if (node.data === data) return node;

			if (data > node.data) {
				return findData(node.right, data);
			} else {
				return findData(node.left, data);
			}
		}
	}

	remove(data) {
		this.rootNode = removeData(this.rootNode, data);

		function removeData(node, data) {
			if (!node) return null;

			if (data > node.data) {
				node.right = removeData(node.right, data);
				return node;
			} else if (data < node.data) {
				node.left = removeData(node.left, data);
				return node;
			}

			if (!node.left && !node.right) {
				return null;
			}

			if (!node.left) {
				node = node.right;
				return node;
			}

			if (!node.right) {
				node = node.left;
				return node;
			}

			let minNodeRight = node.right;

			while (minNodeRight.left) {
				minNodeRight = minNodeRight.left;
			}

			node.data = minNodeRight.data;
			node.right = removeData(node.right, minNodeRight.data);

			return node;
		}
	}

	min() {
		if (!this.rootNode) return null;

		let currMin = this.rootNode;

		while (currMin.left) currMin = currMin.left;

		return currMin.data;
	}

	max() {
		if (!this.rootNode) return null;

		let currMax = this.rootNode;

		while (currMax.right) currMax = currMax.right;

		return currMax.data;
	}
}

module.exports = {
	BinarySearchTree,
};

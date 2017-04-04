'use strict';
var arrayCopy = [];
var NUMBER_OF_PHOTOES = 25;
var arrayOfPhotosNumbers = makeArrayOfNumbers(NUMBER_OF_PHOTOES);
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var pictureTemplate = document.querySelector('#picture-template').content;
var picturesDescriptionList = makePhotosDescriptions(NUMBER_OF_PHOTOES);
var picturesBlock = document.querySelector('.pictures');
var uploadOverlay = document.querySelector('.upload-overlay');
var galleryOverlay = document.querySelector('.gallery-overlay');

function makeArrayOfNumbers(numberOfItems) {
  var arrayOfNumbers = [];
  for (var i = 0; i < numberOfItems; i++) {
    arrayOfNumbers[i] = i + 1;
  }
  return arrayOfNumbers;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getAndDeleteRandomProperty(arr) {
  var index = getRandomNumber(0, arr.length - 1);
  var item = arr[index];
  arr.splice(index, 1);
  return item;
}

function generateArray(arr, maxNumberOfItems) {
  var newArray = [];
  arrayCopy = arr.slice();
  for (var i = 0; i < getRandomNumber(1, maxNumberOfItems); i++) {
    var index = getRandomNumber(0, arrayCopy.length - 1);
    newArray[i] = arrayCopy[index];
    arrayCopy.splice(index, 1);
  }
  return newArray;
}

function makePhotosDescriptions(numberOfPhotos) {
  var photosDescriptionsList = [];
  for (var i = 0; i < numberOfPhotos; i++) {
    var photoDescription = {};
    photoDescription.url = 'photos/' + getAndDeleteRandomProperty(arrayOfPhotosNumbers) + '.jpg';
    photoDescription.likes = getRandomNumber(15, 200);
    photoDescription.comments = generateArray(COMMENTS, 2);
    photosDescriptionsList[i] = photoDescription;
  }
  return photosDescriptionsList;
}

function createPictureElement(templateElement, photoDescriptionObject) {
  var pictureElement = templateElement.cloneNode(true);
  pictureElement.querySelector('img').src = photoDescriptionObject.url;
  pictureElement.querySelector('.picture-likes').textContent = photoDescriptionObject.likes;
  pictureElement.querySelector('.picture-comments').textContent = photoDescriptionObject.comments.length;
  return pictureElement;
}

function createPictureElements(templateElement, photoDescriptionsList) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photoDescriptionsList.length; i++) {
    fragment.appendChild(createPictureElement(templateElement, photoDescriptionsList[i]));
  }
  return fragment;
}

function fillGalleryOverlay(parentElement, photoDescription) {
  parentElement.querySelector('.gallery-overlay-image').src = photoDescription.url;
  parentElement.querySelector('.likes-count').textContent = photoDescription.likes;
  parentElement.querySelector('.comments-count').textContent = photoDescription.comments.length;
}

picturesBlock.appendChild(createPictureElements(pictureTemplate, picturesDescriptionList));
uploadOverlay.classList.add('invisible');
galleryOverlay.classList.remove('invisible');
fillGalleryOverlay(galleryOverlay, picturesDescriptionList[0]);

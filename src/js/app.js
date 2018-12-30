import frontScene from './scenes/front';
import projectScene from './scenes/project';

const $scene = jQuery('.scene');
const sceneName = $scene.data('scene');

if (sceneName === 'front') {
  frontScene($scene);
}

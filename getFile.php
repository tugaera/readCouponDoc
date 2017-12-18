<?php
$fileId = '0BwwA4oUTeiV1UVNwOHItT0xfa2M';
$response = $driveService->files->get($fileId, array(
    'alt' => 'media'));
$content = $response->getBody()->getContents();


$fileId = '1ZdR3L3qP4Bkq8noWLJHSr_iBau0DNT4Kli4SxNc2YEo';
$response = $driveService->files->export($fileId, 'application/pdf', array(
    'alt' => 'media'));
$content = $response->getBody()->getContents();

?>
<?php
/**
 * Plugin Name: AOP Frontend Revalidate
 * Description: Notifies the Next.js frontend on Vercel whenever a post,
 *              page, campaign, or article is saved, deleted, restored, or
 *              transitions status. Drop this file into:
 *                  /wp-content/mu-plugins/aop-frontend-revalidate.php
 *              (create the mu-plugins directory if it does not exist).
 *              No activation needed — mu-plugins auto-load.
 *
 * Required wp-config.php constants:
 *     define('AOP_FRONTEND_URL', 'https://www.assemblyofthepoor.org');
 *     define('AOP_REVALIDATE_SECRET', 'same_value_as_vercel_env');
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!defined('AOP_FRONTEND_URL') || !defined('AOP_REVALIDATE_SECRET')) {
    return;
}

function aop_notify_frontend($post_id, $action = 'save') {
    if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) {
        return;
    }

    $post = get_post($post_id);
    if (!$post) {
        return;
    }

    $type_map = [
        'campaigns' => 'campaigns',
        'articles'  => 'articles',
        'post'      => 'posts',
        'page'      => 'pages',
    ];

    if (!isset($type_map[$post->post_type])) {
        return;
    }

    $payload = [
        'type'   => $type_map[$post->post_type],
        'slug'   => $post->post_name,
        'id'     => $post_id,
        'action' => $action,
    ];

    wp_remote_post(AOP_FRONTEND_URL . '/api/revalidate', [
        'method'   => 'POST',
        'timeout'  => 5,
        'blocking' => false,
        'headers'  => [
            'Content-Type'        => 'application/json',
            'x-revalidate-secret' => AOP_REVALIDATE_SECRET,
        ],
        'body'     => wp_json_encode($payload),
    ]);
}

add_action('save_post', function ($post_id) {
    aop_notify_frontend($post_id, 'save');
}, 20, 1);

add_action('transition_post_status', function ($new_status, $old_status, $post) {
    if ($new_status === $old_status) {
        return;
    }
    aop_notify_frontend($post->ID, "status:{$old_status}->{$new_status}");
}, 20, 3);

add_action('before_delete_post', function ($post_id) {
    aop_notify_frontend($post_id, 'delete');
}, 10, 1);

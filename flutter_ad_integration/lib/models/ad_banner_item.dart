class AdBannerItem {
  final String id;
  final String title;
  final String subtitle;
  final String ctaText;
  final String badge;
  final String targetUrl;
  final String imageUrl;

  AdBannerItem({
    required this.id,
    required this.title,
    required this.subtitle,
    required this.ctaText,
    required this.badge,
    required this.targetUrl,
    this.imageUrl = '',
  });

  factory AdBannerItem.fromJson(Map<String, dynamic> json) {
    return AdBannerItem(
      id: json['id'] as String? ?? 'ad-default',
      title: json['title'] as String? ?? 'Dragon\'s Dogma Online Companion',
      subtitle: json['subtitle'] as String? ?? 'Join the community and level up faster.',
      ctaText: json['ctaText'] as String? ?? 'Learn More',
      badge: json['badge'] as String? ?? 'SPONSORED',
      targetUrl: json['targetUrl'] as String? ?? 'https://discord.gg/dragonsdogmaonline',
      imageUrl: json['imageUrl'] as String? ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'subtitle': subtitle,
      'ctaText': ctaText,
      'badge': badge,
      'targetUrl': targetUrl,
      'imageUrl': imageUrl,
    };
  }
}

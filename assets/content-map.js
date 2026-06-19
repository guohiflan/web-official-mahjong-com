const contentMap = {
  sections: [
    {
      id: "intro",
      title: "游戏简介",
      tags: ["麻将胡了", "入门指南", "规则说明"],
      url: "https://web-official-mahjong.com/intro",
      content: "了解麻将胡了的基本玩法和计分方式。"
    },
    {
      id: "strategy",
      title: "策略与技巧",
      tags: ["麻将胡了", "进阶策略", "高手心得"],
      url: "https://web-official-mahjong.com/strategy",
      content: "提升胜率的核心技巧与牌局分析。"
    },
    {
      id: "tournament",
      title: "赛事专区",
      tags: ["麻将胡了", "比赛", "赛事日程"],
      url: "https://web-official-mahjong.com/tournament",
      content: "最新赛事安排与往届回顾。"
    },
    {
      id: "community",
      title: "玩家社区",
      tags: ["麻将胡了", "论坛", "交流"],
      url: "https://web-official-mahjong.com/community",
      content: "与各地牌友切磋讨论。"
    }
  ],
  keywords: ["麻将胡了", "胡牌技巧", "麻将规则", "在线麻将", "好友对战"]
};

function filterSections(query) {
  if (!query || typeof query !== "string") {
    return contentMap.sections;
  }
  const lowerQuery = query.toLowerCase();
  return contentMap.sections.filter(section => {
    const titleMatch = section.title.toLowerCase().includes(lowerQuery);
    const tagMatch = section.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
    const contentMatch = section.content.toLowerCase().includes(lowerQuery);
    return titleMatch || tagMatch || contentMatch;
  });
}

function getSectionById(id) {
  return contentMap.sections.find(section => section.id === id) || null;
}

function getAllTags() {
  const tagSet = new Set();
  contentMap.sections.forEach(section => {
    section.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet);
}

function searchByKeyword(keyword) {
  if (!keyword || typeof keyword !== "string") {
    return [];
  }
  const lowerKeyword = keyword.toLowerCase();
  return contentMap.sections.filter(section =>
    section.tags.some(tag => tag.toLowerCase() === lowerKeyword) ||
    section.content.toLowerCase().includes(lowerKeyword)
  );
}

function getSectionUrls() {
  return contentMap.sections.map(section => ({
    title: section.title,
    url: section.url
  }));
}

function addSection(newSection) {
  if (!newSection || typeof newSection !== "object") {
    return false;
  }
  const requiredFields = ["id", "title", "tags", "url", "content"];
  const hasAllFields = requiredFields.every(field => newSection.hasOwnProperty(field));
  if (!hasAllFields) {
    return false;
  }
  const exists = contentMap.sections.some(s => s.id === newSection.id);
  if (exists) {
    return false;
  }
  contentMap.sections.push(newSection);
  return true;
}

function removeSection(sectionId) {
  const index = contentMap.sections.findIndex(s => s.id === sectionId);
  if (index === -1) {
    return false;
  }
  contentMap.sections.splice(index, 1);
  return true;
}

function updateSection(sectionId, updates) {
  const section = contentMap.sections.find(s => s.id === sectionId);
  if (!section) {
    return false;
  }
  Object.keys(updates).forEach(key => {
    if (section.hasOwnProperty(key)) {
      section[key] = updates[key];
    }
  });
  return true;
}

function countSectionsByTag() {
  const tagCount = {};
  contentMap.sections.forEach(section => {
    section.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });
  return tagCount;
}

export {
  contentMap,
  filterSections,
  getSectionById,
  getAllTags,
  searchByKeyword,
  getSectionUrls,
  addSection,
  removeSection,
  updateSection,
  countSectionsByTag
};
// 模拟数据
const mockData = [
    {
        group: 'A',
        round: '世界杯',
        time: '2025/11/20 23:59',
        homeTeam: '卡塔尔',
        homeTeamId: '904',
        score: '0-2',
        awayTeam: '厄瓜多尔',
        awayTeamId: '779',
        halfScore: '0-2',
        handicapFull: '*平/半',
        handicapHalf: '平手',
        totalFull: '2/2.5',
        totalHalf: '0.5/1',
        confidenceType: '和局',
        confidenceLevel: '★★★★'
    },
    {
        group: 'A',
        round: '世界杯',
        time: '2025/11/21 23:59',
        homeTeam: '塞内加尔(中)',
        homeTeamId: '815',
        score: '0-2',
        awayTeam: '荷兰',
        awayTeamId: '646',
        halfScore: '0-0',
        handicapFull: '*半/一',
        handicapHalf: '*平/半',
        totalFull: '2.5',
        totalHalf: '1',
        confidenceType: '和局',
        confidenceLevel: '★★★★'
    },
    {
        group: 'A',
        round: '世界杯',
        time: '2025/11/25 21:00',
        homeTeam: '卡塔尔',
        homeTeamId: '904',
        score: '1月3日',
        awayTeam: '塞内加尔',
        awayTeamId: '815',
        halfScore: '0-1',
        handicapFull: '*半球',
        handicapHalf: '*平/半',
        totalFull: '2/2.5',
        totalHalf: '0.5/1',
        confidenceType: '塞內加爾',
        confidenceLevel: '★★★★'
    }
    // ... 其他数据项可以按需添加
];

// 当前页码
let currentPage = 1;
// 每页显示数量
let pageSize = 10;

// 初始化表格数据
function initTable() {
    const tbody = document.querySelector('.data-table tbody');
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = mockData.slice(startIndex, endIndex);

    tbody.innerHTML = pageData.map(item => `
        <tr>
            <td>${item.group}</td>
            <td>${item.round}</td>
            <td>${item.time}</td>
            <td>${item.homeTeam}</td>
            <td>${item.homeTeamId}</td>
            <td>${item.score}</td>
            <td>${item.awayTeam}</td>
            <td>${item.awayTeamId}</td>
            <td>${item.halfScore}</td>
            <td>${item.handicapFull}</td>
            <td>${item.handicapHalf}</td>
            <td>${item.totalFull}</td>
            <td>${item.totalHalf}</td>
            <td>${item.confidenceType}</td>
            <td>${item.confidenceLevel}</td>
        </tr>
    `).join('');

    updatePagination();
}

// 更新分页
function updatePagination() {
    const totalPages = Math.ceil(mockData.length / pageSize);
    const pageNumbers = document.querySelector('.page-numbers');
    const totalInfo = document.querySelector('.total-info');

    // 更新页码
    let pagesHtml = '';
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            pagesHtml += `<span class="active">${i}</span>`;
        } else {
            pagesHtml += `<span>${i}</span>`;
        }
    }
    pageNumbers.innerHTML = pagesHtml;

    // 更新总数信息
    totalInfo.textContent = `共${mockData.length}条，共${totalPages}页`;

    // 绑定页码点击事件
    pageNumbers.querySelectorAll('span').forEach(span => {
        span.addEventListener('click', () => {
            currentPage = parseInt(span.textContent);
            initTable();
        });
    });
}

// 搜索功能
function search() {
    const keyword = document.querySelector('input[type="text"]').value.toLowerCase();
    const filteredData = mockData.filter(item => 
        item.homeTeam.toLowerCase().includes(keyword) ||
        item.awayTeam.toLowerCase().includes(keyword) ||
        item.group.toLowerCase().includes(keyword) ||
        item.round.toLowerCase().includes(keyword)
    );
    
    // 更新表格数据
    currentPage = 1;
    mockData.length = 0;
    mockData.push(...filteredData);
    initTable();
}

// 初始化菜单交互
document.addEventListener('DOMContentLoaded', () => {
    // 初始化表格
    initTable();

    // 绑定菜单点击事件
    document.querySelectorAll('.has-submenu > .menu-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation(); // 阻止事件冒泡
            const parent = item.parentElement;
            
            // 如果点击的不是已经打开的菜单，则关闭其他所有同级菜单
            if (!parent.classList.contains('open')) {
                const siblings = parent.parentElement.querySelectorAll('.has-submenu.open');
                siblings.forEach(sibling => {
                    if (sibling !== parent) {
                        sibling.classList.remove('open');
                    }
                });
            }
            
            // 切换当前菜单的展开状态
            parent.classList.toggle('open');
        });
    });

    // 绑定搜索按钮事件
    document.querySelector('.btn-search').addEventListener('click', search);

    // 绑定重置按钮事件
    document.querySelector('.btn-reset').addEventListener('click', () => {
        document.querySelector('input[type="text"]').value = '';
        search();
    });

    // 绑定状态过滤器事件
    document.querySelectorAll('.status-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector('.status-item.active').classList.remove('active');
            item.classList.add('active');
        });
    });

    // 绑定每页显示数量选择事件
    document.querySelector('.page-size select').addEventListener('change', (e) => {
        pageSize = parseInt(e.target.value);
        currentPage = 1;
        initTable();
    });
});

// 更新样式
const style = document.createElement('style');
style.textContent = `
    .data-table {
        font-size: 14px;
    }
    .data-table td {
        white-space: nowrap;
    }
    .data-table th {
        white-space: nowrap;
        background-color: #f5f5f5;
    }
`;
document.head.appendChild(style); 
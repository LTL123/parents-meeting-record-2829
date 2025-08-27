const studentMap = {
  'wangyiyang': { name: '王依杨', englishName: 'Kitty', grade: '七年级', time: '8月28日（周四）- 上午10:30-10:50' },
  'cheyanzhen': { name: '车彦臻', englishName: 'Snow', grade: '七年级', time: '8月28日（周四）- 下午4:10-4:30' },
  'wangruoxuan': { name: '王若瑄', englishName: 'Jessica', grade: '七年级', time: '' },
  'xiabicheng': { name: '夏碧城', englishName: 'Celeste Velentin', grade: '七年级', time: '8月28日（周四）- 上午9:00-9:20' },
  'zhangxuanyumeng': { name: '张轩语檬', englishName: 'Thea', grade: '七年级', time: '8月28日（周四）- 下午3:00-3:20' },
  'xuehaoyuan': { name: '薛皓元', englishName: 'Mark', grade: '七年级', time: '8月28日（周四）- 上午10:30-10:50' },
  'huangxinyan': { name: '黄馨妍', englishName: 'Cindy', grade: '七年级', time: '8月28日（周四）- 下午4:10-4:30' },
  'xingruoxi': { name: '邢若溪', englishName: 'Alice', grade: '七年级', time: '' },
  'fangyulin': { name: '方昱霖', englishName: 'NOLAN', grade: '七年级', time: '8月28日（周四）- 上午9:00-9:20' },
  'linrui': { name: '林芮', englishName: 'Cherry', grade: '七年级', time: '8月28日（周四）- 上午11:10-11:30' },
  'zengwenke': { name: '曾文可', englishName: 'Tanya', grade: '七年级', time: '8月28日（周四）- 下午4:10-4:30' },
  'linyixin': { name: '林一心', englishName: 'yiyi', grade: '七年级', time: '8月28日（周四）- 上午9:30-9:50' },
  'luotianyu': { name: '罗天瑜', englishName: 'Rockey', grade: '七年级', time: '8月28日（周四）- 上午9:00-9:20' },
  'yaoyuntao': { name: '姚云韬', englishName: 'Terrence', grade: '七年级', time: '8月28日（周四）- 下午3:40-4:00' },
  'shidiwen': { name: '施迪文', englishName: 'Steven', grade: '七年级', time: '8月28日（周四）- 上午11:40-12:00' },
  'xieruiqi': { name: '谢瑞麒', englishName: 'Austin', grade: '七年级', time: '8月28日（周四）- 上午11:10-11:30' },
  'hongdaren': { name: '洪大仁', englishName: 'Tj', grade: '七年级', time: '8月29日（周五）- 下午2:30 - 2:50' },
  'wangyueyang': { name: '王阅洋', englishName: 'Chris', grade: '七年级', time: '' },
  'duenyong': { name: '杜恩永', englishName: 'Jason', grade: '七年级', time: '8月28日（周四）- 下午3:40-4:00' }
};

AV.init({
  appId: "4Hg3Vqoqs9Glh2Bqk5JrIOWQ-MdYXbMMI",
  appKey: "GgVKJJThpDK1p6ATLGkj7Lwe",
  serverURL: "https://4hg3vqoq.api.lncldglobal.com"
});

document.addEventListener('DOMContentLoaded', () => {
  const studentList = document.getElementById('student-list');
  const studentListContainer = document.querySelector('.student-list-container');
  const meetingRecordContainer = document.querySelector('.meeting-record-container');
  const recordTitle = document.getElementById('record-title');
  const backToListBtn = document.getElementById('back-to-list');
  const meetingForm = document.getElementById('meeting-form');
  const studentNameInput = document.getElementById('studentName');
  const gradeInput = document.getElementById('grade');
  const meetingTimeInput = document.getElementById('meetingTime');
  const recordTimeInput = document.getElementById('recordTime');
  const discussionInput = document.getElementById('discussion');
  const saveRecordBtn = document.getElementById('save-record');
  const resetFormBtn = document.getElementById('reset-form');
  const searchInput = document.getElementById('search-input');
  const messageContainer = document.getElementById('message-container');

  let currentStudentId = null;
  let allStudentCards = [];

  function showMessage(message, type = 'success') {
    messageContainer.innerHTML = '';
    const messageEl = document.createElement('div');
    messageEl.className = `${type}-message`;
    messageEl.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      ${message}
    `;
    messageContainer.appendChild(messageEl);
    
    setTimeout(() => {
      messageEl.remove();
    }, 5000);
  }



  function getInitials(name) {
    return name.charAt(0);
  }

  function getGradeColor(grade) {
    const colors = {
      '六年级': '#10b981',
      '七年级': '#f59e0b',
      'TJ': '#ef4444'
    };
    return colors[grade] || '#6366f1';
  }

  function showStudentList() {
    studentListContainer.style.display = 'block';
    meetingRecordContainer.style.display = 'none';
    studentListContainer.classList.add('fade-in');
  }

  function showMeetingRecord(studentId) {
    currentStudentId = studentId;
    const studentInfo = studentMap[studentId];
    recordTitle.textContent = `${studentInfo.name}${studentInfo.englishName ? ` (${studentInfo.englishName})` : ''}`;
    studentNameInput.value = `${studentInfo.name}${studentInfo.englishName ? ` (${studentInfo.englishName})` : ''}`;
    gradeInput.value = studentInfo.grade;
    meetingTimeInput.value = studentInfo.time;
    recordTimeInput.value = dayjs().format('YYYY-MM-DD HH:mm:ss');
    discussionInput.value = localStorage.getItem(`discussion_${studentId}`) || '';
    studentListContainer.style.display = 'none';
    meetingRecordContainer.style.display = 'block';
    meetingRecordContainer.classList.add('fade-in');
    messageContainer.innerHTML = '';
  }

  function createStudentCard(studentId, studentInfo) {
    const li = document.createElement('li');
    li.className = 'student-card';
    li.dataset.studentId = studentId;
    li.dataset.name = studentInfo.name.toLowerCase();
    li.dataset.englishName = studentInfo.englishName ? studentInfo.englishName.toLowerCase() : '';
    li.dataset.grade = studentInfo.grade.toLowerCase();
    
    li.innerHTML = `
      <div class="student-info">
        <div class="student-avatar" style="background: linear-gradient(135deg, ${getGradeColor(studentInfo.grade)}, ${getGradeColor(studentInfo.grade)}dd)">
          ${getInitials(studentInfo.name)}
        </div>
        <div class="student-details">
          <h3>${studentInfo.name}${studentInfo.englishName ? ` (${studentInfo.englishName})` : ''}</h3>
          <span class="student-grade" style="background-color: ${getGradeColor(studentInfo.grade)}20; color: ${getGradeColor(studentInfo.grade)}">${studentInfo.grade}</span>
          <div class="student-time">
            <i class="fas fa-clock"></i>
            ${studentInfo.time}
          </div>
        </div>
      </div>
    `;
    
    li.addEventListener('click', () => showMeetingRecord(studentId));
    return li;
  }

  function renderStudentList() {
    studentList.innerHTML = '';
    allStudentCards = [];
    
    Object.keys(studentMap).forEach(studentId => {
      const card = createStudentCard(studentId, studentMap[studentId]);
      allStudentCards.push(card);
      studentList.appendChild(card);
    });
  }

  function filterStudents() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    allStudentCards.forEach(card => {
      const name = card.dataset.name;
      const englishName = card.dataset.englishName;
      const grade = card.dataset.grade;
      const isVisible = !searchTerm || name.includes(searchTerm) || englishName.includes(searchTerm) || grade.includes(searchTerm);
      card.style.display = isVisible ? 'block' : 'none';
    });
  }

  // Initialize
  renderStudentList();

  // Event listeners
  searchInput.addEventListener('input', filterStudents);
  
  backToListBtn.addEventListener('click', showStudentList);

  discussionInput.addEventListener('input', () => {
    if (currentStudentId) {
      localStorage.setItem(`discussion_${currentStudentId}`, discussionInput.value);
    }
  });

  resetFormBtn.addEventListener('click', () => {
    if (confirm('确定要重置表单吗？未保存的内容将丢失。\n(Are you sure you want to reset the form? Unsaved content will be lost.)')) {
      discussionInput.value = '';
      recordTimeInput.value = dayjs().format('YYYY-MM-DD HH:mm:ss');
      if (currentStudentId) {
        localStorage.removeItem(`discussion_${currentStudentId}`);
      }
      showMessage('表单已重置 (Form has been reset)', 'success');
    }
  });

  meetingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!discussionInput.value.trim()) {
      showMessage('请输入讨论内容', 'error');
      discussionInput.focus();
      return;
    }

    if (discussionInput.value.trim().length < 10) {
      showMessage('讨论内容至少需要10个字符', 'error');
      discussionInput.focus();
      return;
    }

    saveRecordBtn.disabled = true;
    saveRecordBtn.classList.add('loading');
    const originalText = saveRecordBtn.innerHTML;
    saveRecordBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 保存中...';

    try {
      const MeetingRecord = AV.Object.extend('meetingRecord');
      const meetingRecord = new MeetingRecord();
      meetingRecord.set('studentId', currentStudentId);
      meetingRecord.set('studentName', studentNameInput.value);
      meetingRecord.set('grade', gradeInput.value);
      meetingRecord.set('meetingTime', meetingTimeInput.value);
      meetingRecord.set('recordTime', recordTimeInput.value);
      meetingRecord.set('discussion', discussionInput.value.trim());
      
      await meetingRecord.save();
      
      showMessage('会议记录保存成功！您可以继续编辑或返回学生列表。\n(Meeting record saved successfully! You can continue editing or return to the student list.)', 'success');
      
      // Clear local storage after successful save
      if (currentStudentId) {
        localStorage.removeItem(`discussion_${currentStudentId}`);
      }
      
    } catch (error) {
      console.error('保存失败:', error);
      showMessage('保存失败，请检查网络连接后重试\n(Save failed, please check your network connection and try again)', 'error');
    } finally {
      saveRecordBtn.disabled = false;
      saveRecordBtn.classList.remove('loading');
      saveRecordBtn.innerHTML = originalText;
    }
  });

  // Auto-save functionality
  let autoSaveTimeout;
  discussionInput.addEventListener('input', () => {
    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
      if (currentStudentId && discussionInput.value.trim()) {
        localStorage.setItem(`discussion_${currentStudentId}`, discussionInput.value);
      }
    }, 1000);
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 's' && meetingRecordContainer.style.display !== 'none') {
        e.preventDefault();
        meetingForm.dispatchEvent(new Event('submit'));
      }
      if (e.key === 'Escape') {
        if (meetingRecordContainer.style.display !== 'none') {
          showStudentList();
        }
      }
    }
  });
});